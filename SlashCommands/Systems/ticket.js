const { EmbedBuilder, CommandIntercation, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const { OPENTICKETCHANNELID } = require("../../config.json")

module.exports = {
    name: "ticket",
    description: "Setup your ticketing massage.",
    permissions: "Administrator",
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

        const Buttons = new ActionRowBuilder();
        Buttons.addComponents(
            new ButtonBuilder()
                .setCustomId("feedback")
                .setLabel("Feedback")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("📢"),
            new ButtonBuilder()
                .setCustomId("bug")
                .setLabel("Bug Report")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("🐞"),
            new ButtonBuilder()
                .setCustomId("idea")
                .setLabel("Ideas/Other Reports")
                .setStyle(ButtonStyle.Success)
                .setEmoji("💡"),
        );

        await guild.channels.cache
            .get(OPENTICKETCHANNELID)
            .send({embeds: [ticketEmbed], components: [Buttons] });
        
        interaction.followUp({ content: "Done", ephermeral: true});

    }
}