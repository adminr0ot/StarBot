//import client vom main.js
const client = require('../../main.js');

const { 
    ButtonInteraction, 
    MessageEmbed, 
    MessageActionRow, 
    MessageButton, 
    Message 
} = require("discord.js");
const DB = require("../../structures/Schemas/Ticket");
const { TICKETSPACEID, EVERYONEID } = require("../../config.json");

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isButton()) return;
    const { guild, member, customId } = interaction;
    if(!["player", "bug", "other"].includes(customId)) return;
    const ID = Math.floor(Math.random() * 90000) + 10000;
    await guild.channels.create(`${member.user.username + "-" + customId + "-" + ID}`, {
        type: "GUILD_TEXT",
        parent: TICKETSPACEID,
        permissionOverwrites: [
            {
                id: member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
            {
                id: EVERYONEID,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
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

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton()
                .setCustomId("close")
                .setLabel("Save and Close Ticket")
                .setStyle("PRIMARY")
                .setEmoji("💾"),
            new MessageButton()
                .setCustomId("lock")
                .setLabel("Lock")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
            new MessageButton()
                .setCustomId("unlock")
                .setLabel("Unlock")
                .setStyle("SUCCESS")
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