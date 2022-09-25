const { MessageEmbed, CommandIntercation, MessageActionRow, MessageButton} = require("discord.js");
const { OPENTICKETCHANNELID } = require("../../config.json")

module.exports = {
    name: "ticket",
    description: "Setup your ticketing massage.",
    permissions: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
     run: async(client, interaction, guild, args) => {

        const ticketEmbed = {
            color: 0x36393f,
            author: {
                name: guild.name + " | Ticketing System",
                icon_url: guild.iconURL({dynamic: true})
            },
            description: 'Open a ticket to discuss any of the issues listed on the button.'
        };

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton()
                .setCustomId("player")
                .setLabel("Player Report")
                .setStyle("PRIMARY")
                .setEmoji("🕹"),
            new MessageButton()
                .setCustomId("bug")
                .setLabel("Bug Report")
                .setStyle("SECONDARY")
                .setEmoji("🐞"),
            new MessageButton()
                .setCustomId("other")
                .setLabel("Ideas/Other Reports")
                .setStyle("SUCCESS")
                .setEmoji("💡"),
        );

        await guild.channels.cache
            .get(OPENTICKETCHANNELID)
            .send({embeds: [ticketEmbed], components: [Buttons] });
        
        interaction.followUp({ content: "Done", ephermeral: true});

    }
}