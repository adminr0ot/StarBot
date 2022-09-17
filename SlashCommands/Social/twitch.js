const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'twitch',
    description: 'Wessen Stream link brauchst du?',
    options: [{
        name: 'channel',
        description: 'Provide the channel you want the link for',
        type: 'STRING',
        require: true,
        choices: [
            { 
                name: 'CAN', 
                value: 'can' 
            },
            { 
                name: 'Wurzel', 
                value: 'wurzel' 
            },
            { 
                name: 'BaharChan', 
                value: 'baharchan' 
            },
            { 
                name: 'Schlachtenbummler', 
                value: 'schlachtenbummler' 
            }
        ],
    }],
    //ToDo: change to modifiable setups
    run: async(client, interaction, guild, args) => {
        if (args[0] == "can") {
			interaction.followUp("https://www.twitch.tv/crash_academy");
        } else if (args[0] == "wurzel") {
			interaction.followUp("https://www.twitch.tv/wrzlprnft")
		} else if (args[0] == "baharchan") {
			interaction.followUp("https://www.twitch.tv/baharchan")
		} else if (args[0] == "schlachtenbummler") {
			interaction.followUp("https://www.twitch.tv/die_schlachtenbummler")
		}
    }
}