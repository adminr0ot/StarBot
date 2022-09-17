const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'ship',
    description: 'Zu wessen Streaming Setup möchtest du Infos?',
    options: [{
        name: 'name',
        description: 'Provide the Shipname you want informations for',
        type: 'STRING',
        require: true,
    }],
    run: async(client, interaction, guild, args) => {
        let search = args[0].toUpperCase()
        search = search.replace(/[ ",-]+/g, "")
        console.log("Outside: "+search)
        //build request
        var request = require('request');
        var headers = {
            'Accept': '*/*',
            'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
            'Host': 'robertsspaceindustries.com',
            'Referer': 'https://robertsspaceindustries.com/ship-matrix',
            'X-Requested-With': 'XMLHttpRequest',
        };

        var options = {
            url: 'https://robertsspaceindustries.com/ship-matrix/index',
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var matrix = JSON.parse(body)

                var resultNames = "";
                var match = 0;
                //Parse for match
                for (const ship of matrix.data) {
                    let comp = ship.name.toUpperCase();
                    comp = comp.replace(/[ ",-]+/g, "")

                    //ToDo: Build comparison that does not require 100% match and proposes alternatives
                    //var re = new RegExp(comp*, 'g')
                    //if (search.match(re)) {

                    if (comp == search) {
                        console.log(ship.id);

                        //Fix CIG's crap
                        let shipFix
                        if (ship.media[0].source_url.startsWith("http") == 0) {
                            ship.media[0].source_url = 'https://robertsspaceindustries.com' + ship.media[0].source_url;
                        }

                        //Build Embed
                        const shipEmbed = {
                            color: 0xfdbe18,
                            title: ship.name,
                            url: 'https://robertsspaceindustries.com' + ship.url,
                            author: {
                                name: ship.manufacturer.name + "("+ ship.manufacturer.code +")",
                                icon_url: 'https://robertsspaceindustries.com' + ship.manufacturer.media[0].images.heap_thumb,
                                url: "https://robertsspaceindustries.com/pledge/ships?manufacturer_id" + ship.manufacturer.id,
                            },
                            description: ship.description,
                            thumbnail: {
                                url: 'https://robertsspaceindustries.com' + ship.manufacturer.media[0].images.heap_thumb,
                            },
                            "fields": [
                                {
                                    "name": "Länge:",
                                    "value": ship.length+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Breite:",
                                    "value": ship.beam+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Höhe:",
                                    "value": ship.height+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Besatzung:",
                                    "value": ship.min_crew + "/" + ship.max_crew,
                                    "inline": true
                                },
                                {
                                    "name": "SCM Geschw.:",
                                    "value": ship.scm_speed+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Max Geschw.:",
                                    "value": ship.afterburner_speed+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Gewicht",
                                    "value": ship.mass +" kg",
                                    "inline": true
                                },
                                {
                                    "name": "Fracht:",
                                    "value": ship.cargocapacity + " SCU",
                                    "inline": true
                                },
                                {
                                    "name": "Fokus:",
                                    "value": ship.focus+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Größe:",
                                    "value": ship.size+" ",
                                    "inline": true
                                },
                                {
                                    "name": "Link",
                                    "value": 'https://robertsspaceindustries.com'+ ship.url,
                                    "inline": false
                                },
                            ],
                            image: {
                                url: ship.media[0].source_url,
                            },
                            timestamp: 'Letzte Änderung: ' + ship.time_modified.unfiltered,
                            footer: {
                                text: 'StarBot by CAN',
                                icon_url: 'https://events.crashacademy.net/wp-content/uploads/2021/05/CAN_LOGO_Wide_NoBox-200x81.png',
                                url: 'https://www.twitch.tv/crash_academy',
                            },
                        };
                        
                        interaction.followUp({ embeds: [shipEmbed] });
                        match = 1;
                        break;
                    }
                } 
                if (match == 0) {
                    interaction.followUp("Keine Übereinstimmung gefunden.\nZurzeit braucht der Bot noch den genauen/kompletten Namen");
                }
            }
        }

        //call request
        request(options, callback);
    }
}