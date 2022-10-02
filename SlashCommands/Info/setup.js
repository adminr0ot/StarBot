const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'setup',
    description: 'Zu wessen Streaming Setup möchtest du Infos?',
    options: [{
        name: 'streamer',
        description: 'Provide the Streamer you want the setup for',
        type: 3,
        require: true,
        choices: [
            { 
                name: 'Sudo', 
                value: 'sudo' 
            },
            { 
                name: 'Wurzel', 
                value: 'wurzel' 
            },
            { 
                name: 'Sawyer', 
                value: 'sawyer' 
            }
        ],
    }],
    //ToDo: change to modifiable setups
    run: async(client, interaction, guild, args) => {
        if (args[0] == "sawyer") {
			interaction.followUp("```CPU: Intel Core i9-10900KF\nGrafik: MSI GeForce RTX 3060 Ti GAMING X TRIO\nMainboard: ASUS ROG Maximus XII Hero [WI-FI]\nRAM: 4x Corsair Dominator Platinum RGB DIMM 16GB, DDR4-3200\nCPU-Lüfter: Noctua NH-D15\nHeadset: Logitech G933\nMikro: RØDE NT-USB```");
        } else if (args[0] == "sudo") {
			interaction.followUp("```CPU: AMD Ryzen™ Threadripper™ 3960X @4,8 GHz\nGrafik: GeForce RTX 3090\nMainboard: ASUS Zenith 2 Extreme Alpha\n2x Custom WaKü\nRAM: 256 GB DDR 4 RAM @ 3600 MHz\nHeadset: Astro Gaming A50\nMikro: Rode NT USB\nFlight Sticks: Virpil Constellation Alpha L+R mit WarBRD Base```")
		} else if (args[0] == "wurzel") {
			interaction.followUp("```CPU: AMD Ryzen™ 7 3700X\nGrafik: Sapphire Pulse RX 580 4GB\nMainboard: MSI Gaming Carbon Pro X370\nRAM: 4 x 8 GB DDR 4 RAM @ 3200 MHz CL16\nKühler: AMD Wraith Prism\nCorsair Void Elite Wireless\nMikro & Interface: Behringer XM8500 & Behringer U-Phoria UM2```")
		}
    }
}