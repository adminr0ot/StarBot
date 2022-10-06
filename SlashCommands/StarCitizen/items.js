const { EmbedBuilder } = require("discord.js")
const fs = require("fs");
const { includes } = require("quick.db");
const { isDeepStrictEqual } = require("util");
const DBfpsitems = require("../../structures/Schemas/FPS-Items");
const DBshipitems = require("../../structures/Schemas/Ship-Items");
const DBshopitems = require("../../structures/Schemas/Shop-Items");

module.exports = {
    name: 'item',
    description: 'Which item do you want more information about?',
    options: [{
        name: 'categorie',
        description: 'What categorie is the object?',
        type: 3,
        require: true,
        choices: [
            { 
                name: 'FPS', 
                value: 'fps-items' 
            },
            { 
                name: 'Component', 
                value: 'ship-items' 
            }
        ],
    },
    {
        name: 'type',
        description: 'What type is the object?',
        type: 3,
        require: true,
        choices: [
            { 
                name: 'Weapon', 
                value: 'WeaponPersonal' 
            },
            { 
                name: 'Attachment', 
                value: 'WeaponAttachment' 
            },
            //{ 
            //    name: 'Undersuit', 
            //    value: 'Char_Armor_Undersuit' 
            //},
            //{ 
            //    name: 'Armor Arms', 
            //    value: 'Char_Armor_Arms' 
            //},
            //{ 
            //    name: 'Armor Torso', 
            //    value: 'Char_Armor_Torso' 
            //},
            //{ 
            //    name: 'Armor Helmet', 
            //    value: 'Char_Armor_Helmet' 
            //},
            //{ 
            //    name: 'Armor Legs', 
            //    value: 'Char_Armor_Legs' 
            //},
            { 
                name: 'Power Plants', 
                value: 'PowerPlant' 
            },
            { 
                name: 'Cooler', 
                value: 'Cooler' 
            },
            { 
                name: 'Paints', 
                value: 'Paints' 
            },
            { 
                name: 'Quantum Drive', 
                value: 'QuantumDrive' 
            },
            { 
                name: 'Ship Weapon', 
                value: 'WeaponGun' 
            },
            { 
                name: 'Mining Laser', 
                value: 'WeaponMining' 
            },
            { 
                name: 'Mining Laser', 
                value: 'WeaponMining' 
            },
            { 
                name: 'Missile', 
                value: 'Missile' 
            },
        ],
    },
    {
        name: 'name',
        description: 'Provide the Item Name you want informations for',
        type: 3,
        require: true,
    }],
    run: async(client, interaction, guild, args) => {
        let search = args[2].toUpperCase();
        search = search.replace(/[^a-zA-Z0-9]+/g, "");

        //Problem Solving //ToDo: find a better search function
        switch (search) {
            case 'P8':
                search = 'P8SC';
                break;
            case 'F55':
                search = 'F55LMG';
                break;
            case 'FS9':
                search = 'FS9LMG';
                break;
            case 'P6':
                search = 'P6LR';
                break;
            case 'BR2':
                search = 'BR2SHOTGUN';
                break;
            case 'PT1':
                search = 'PT11XHOLOGRAPHIC';
                break;
            case 'SCALPEL':
                search = 'SCALPELSNIPER';
                break;
        }

        //load labels
        const labels = JSON.parse(fs.readFileSync(`src/items/labels.json`));
        
        //search item name
        const labelvalues = Object.values(labels);
        const labelkeys = Object.keys(labels);

        var itemindex = []
        for (var i = 0; i < labelvalues.length; i++) {
            var test = [];
            test[i] = labelvalues[i].toUpperCase();
            test[i] = test[i].replace(/[^a-zA-Z0-9]+/g, "");
            if (test[i].includes(search)) {
                itemindex.push({
                    index: i,
                    name: test[i]
                })
            }
        }
        //read & translate matching labels
        const uniqueItemsindex = []
        for (const [i, item] of itemindex.entries()) {
            uniqueItemsindex[i] = {label: labelvalues[itemindex[i].index], key: labelkeys[itemindex[i].index]}
        };
        
        for (const [i, item] of uniqueItemsindex.entries()) {
            uniqueItemsindex[i] = "@"+uniqueItemsindex[i].key
        }
        console.log(uniqueItemsindex)
        if (uniqueItemsindex[0] != null) {
            if(args[0] == 'fps-items') {

                //remove irrelevant data from the array
                for (var i = 0; i < uniqueItemsindex.length; i++){
                    var t = uniqueItemsindex[i].toUpperCase();
                    if (!t.startsWith('@ITEM_NAME') || t.endsWith('_SHORT') || t.endsWith('_MAG') || t.startsWith('@ITEM_NAME_')) {
                        uniqueItemsindex.splice(i, 1); 
                        i--;
                    }
                }
                DBfpsitems.findOne({ name: uniqueItemsindex[0], type: args[1] }, async (err, docs) => {
                    if(err) throw err;
                    if(!docs) return interaction.followUp("No item information could be found for this entry");

                    //replace Placeholder
                    if(docs.stdItem.Manufacturer.Name == '@LOC_PLACEHOLDER' && docs.manufacturer == 'NVTC') docs.stdItem.Manufacturer.Name = 'NV-TAC';
                    if(docs.stdItem.Description.startsWith('@')) docs.stdItem.Description = 'no description found'
    
                    // Request Shops
                    DBshopitems.find({ "inventory.item_reference": docs.reference, name: {$ne: "FPSWeaponsArmor"}}, async (err, price) => {
                        if(err) throw err;
                        if(!price) return console.log("No Data");
                        let shopnames = "";
                        for (var i = 0; i < price.length; i++) {
                            shopnames = shopnames + price[i].name.replace(/_+/g, ", ").replace("Stanton4", "MicroTech") + "\n";
                        }
                        if(shopnames == "") shopnames = "no shops found"
    
                        // build embed
                        const itemEmbed = {
                            color: 0xfdbe18,
                            title: docs.stdItem.Name,
                            author: {
                                name: docs.stdItem.Manufacturer.Name + "("+ docs.manufacturer +")",
                            },
                            description: docs.stdItem.Description,
                            "fields": [
                                {
                                    "name": "Shops:",
                                    "value": shopnames,
                                    "inline": true
                                },
                            ],
                            //image: {
                            //    url: ship.media[0].source_url,
                            //},
                            footer: {
                                text: 'StarBot by CAN',
                                icon_url: 'https://events.crashacademy.net/wp-content/uploads/2021/05/CAN_LOGO_Wide_NoBox-200x81.png',
                            },
                        };
                        interaction.followUp({ embeds: [itemEmbed] });
                    });
                });
            } else if(args[0] == 'ship-items') {
                if(search.length < 3) return interaction.followUp("Please specify your search with 3 characters or more")
                DBshipitems.find({ name: { $in: uniqueItemsindex}, type: args[1] }, async (err, docs) => {
                    if(err) throw err;
                    if(!docs) return interaction.followUp("No item information could be found for this entry.");
    
                    for (const [i, document] of docs.entries()) {
                        if (document.type == args[1] && !document.itemName.endsWith("_lowpoly")) {
                            
                            // Request Shops
                            DBshopitems.find({ "inventory.item_reference": document.reference, name: {$ne: "FPSWeaponsArmor"}}, async (err, price) => {
                                if(err) throw err;
                                if(!price) return console.log("No Data");
                                let shopnames = "";
                                for (var i = 0; i < price.length; i++) {
                                    shopnames = shopnames + price[i].name.replace(/_+/g, ", ").replace("Stanton4", "MicroTech") + "\n";
                                }

                                if(shopnames == "") shopnames = "no shops found"

                                // build embed
                                const itemEmbed = {
                                    color: 0xfdbe18,
                                    title: document.stdItem.Name,
                                    author: {
                                        name: document.stdItem.Manufacturer.Name + "("+ document.manufacturer +")",
                                    },
                                    description: document.stdItem.Description,
                                    "fields": [
                                        {
                                            "name": "Shops:",
                                            "value": shopnames,
                                            "inline": true
                                        },
                                    ],
                                    //image: {
                                    //    url: ship.media[0].source_url,
                                    //},
                                    footer: {
                                        text: 'StarBot by CAN',
                                        icon_url: 'https://events.crashacademy.net/wp-content/uploads/2021/05/CAN_LOGO_Wide_NoBox-200x81.png',
                                    },
                                };
                                interaction.followUp({ embeds: [itemEmbed] });
                            });
                        }
                    }
                });
            }
        } else {
            interaction.followUp("No item information could be found for this entry.");
        }
        

        //var itemmatrix = JSON.parse(body);
        
    }
}