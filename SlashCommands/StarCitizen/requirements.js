const { EmbedBuilder } = require("discord.js")
module.exports = {
    name: 'reqirements',
    description: 'Erfahre, welche offiziellen Systemanforderungen Star Citizen hat.',
    run: async(client, interaction, guild, args) => {
        interaction.followUp("```Windows 8.1/Windows 10 (64bit) (Latest Service Pack), Windows 11 kann noch probleme machen.\nDirectX 11.1 Grafikkarte mit 4GB+ RAM\nQuad Core CPU (Intel: Sandy Bridge oder neuer, AMD: Bulldozer oder neuer)\n16GB+ RAM\nSSD sehr empfohlen\nNTFS formatierte Festplatte mit mindestens 83GB+ freiem Speicerplatz\nMicrosoft .NET Framework 3.5 and 4.5.2\nPorts: TCP 8000 - 8020 und UDP 64090 - 64110```");
    }
}