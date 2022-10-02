//import client vom main.js
const client = require('../../main.js');

const { 
    ButtonInteraction, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    Message,
    ButtonStyle,
    ChannelType
} = require("discord.js");
const DB = require("../../structures/Schemas/Ticket");
const { TICKETSPACEID, EVERYONEID } = require("../../config.json");

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isButton()) return;
    const { guild, member, customId } = interaction;
    if(!["player", "bug", "other"].includes(customId)) return;
    const ID = Math.floor(Math.random() * 90000) + 10000;
    console.log("Works");
    await guild.channels.create({
        name: member.user.username + "-" + customId + "-" + ID, 
        type:  ChannelType.GuildText,
        parent: TICKETSPACEID,
        permissionOverwrites: [
            {
                id: member.id,
                allow: ["SendMessages", "ViewChannel", "ReadMessageHistory"],
            },
            {
                id: EVERYONEID,
                deny: ["SendMessages", "ViewChannel", "ReadMessageHistory"]
            }
        ],
    }).then(async (channel) => {
        await DB.create({
            GuildID: guild.id,
            MemberID: member.id,
            TicketID: ID,
            ChannelID: channel.id,
            Closed: false,
            Locked: false,
            Type: customId,
        });

        const Embed = {
            author: {
                name: guild.name + "| Ticket: " + ID,
                icon_url: guild.iconURL({dynamic: true})
            },
            description: 'Please wait patiently for a response from the Staff team, in the mean while, describe your concern in as much detail as possible.',
            footer: {
                text: 'The buttons below are Staff only Buttons.',
            }
        }

        const Buttons = new ActionRowBuilder();
        Buttons.addComponents(
            new ButtonBuilder()
                .setCustomId("close")
                .setLabel("Save and Close Ticket")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("💾"),
            new ButtonBuilder()
                .setCustomId("lock")
                .setLabel("Lock")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("🔒"),
            new ButtonBuilder()
                .setCustomId("unlock")
                .setLabel("Unlock")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🔓"),
        );
        channel.send({
            embeds: [Embed],
            components: [Buttons]
        });
        await channel
            .send({content: `${member} here is your ticket`})
            .then((m) => {
                setTimeout(() => {
                m.delete().catch(() => {});
        }, 1 * 5000);
        });
        interaction.reply({
            content: `${member} your ticket has been created ${channel}`,
            ephemeral: true,
        });
    });
})