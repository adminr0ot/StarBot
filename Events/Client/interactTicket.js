//import client vom main.js
const client = require('../../main.js');

const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const { TICKETTRANSCRIPTID } = require("../../config.json");
const DB = require("../../structures/Schemas/Ticket");

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isButton()) return;
    const { guild, customId, channel, member } = interaction;
    if(!member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "You cannot use these buttons.", ephemeral: true,})
        if(!["close", "lock", "unlock"].includes(customId)) return;

    const Embed = new MessageEmbed().setColor("BLUE");

    DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
        if(err) throw err;
        if(!docs)
            return interaction.reply({
                content:
                    "No data was found related to this ticket, please delete manual.",
                ephemeral: true,
            });
        switch (customId) {
            case "lock":
                if (docs.Locked == true)
                    return interaction.reply({
                        content: "The ticket is already locked",
                        ephemeral: true,
                    });
                await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
                Embed.setDescription("🔒 | This ticket is now locked for review.");
                channel.permissionOverwrites.edit(docs.MemberID, {
                    SEND_MESSAGES: false,
                });
                interaction.reply({ embeds: [Embed] });
                break;
            case "unlock":
                if (docs.Locked == false)
                return interaction.reply({
                    content: "The ticket is already unlocked",
                    ephemeral: true,
                });
                await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
                Embed.setDescription("🔓 | This ticket is now unlocked.");
                channel.permissionOverwrites.edit(docs.MemberID, {
                    SEND_MESSAGES: true,
                });
                interaction.reply({ embeds: [Embed] });
                break;
            case "close":
                if (docs.Closed == true)
                return interaction.reply({
                    content: "The ticket is already closed, please wait for it to get deleted.",
                    ephemeral: true,
                });
                const  attachmend = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`,
                });
                await DB.updateOne({ChannelID: channel.id}, {Closed: true });

                const MEMBER = guild.members.cache.get(docs.MemberID);
                const scriptEmbed = {
                    author: {
                        name: MEMBER.user.tag,
                        icon_url: MEMBER.user.displayAvatarURL({dynamic: true}),
                    },
                    title: `Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`,
                };
                const Message = await guild.channels.cache.get(TICKETTRANSCRIPTID).send({embeds: [scriptEmbed], files: [attachmend]});
                interaction.reply({
                    embeds: [Embed.setDescription(`The transcript is now saved [TRANSCRIPT](${Message.url})`
                    ),
                ],
                });

                setTimeout(() => {
                    channel.delete()
                }, 10 * 1000);
        }
    });
});