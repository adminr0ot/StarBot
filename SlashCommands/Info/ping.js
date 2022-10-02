const { MessageEmbed } = require("discord.js")
module.exports = {
    name : "ping",
    description : "checking ping of bot",
    options: [{
            name: 'message',
            description: 'send message',
            type: 3,
            require: true,
    }],
    run : async (client, interaction, args) => {
        const msg = interaction.options.getString('message');
        interaction.followUp(msg);
    }
}