const { EmbedBuilder } = require("discord.js")
module.exports = {
    name: '8ball',
    description: 'Der 8ball weissagt dir die Antworten zu all deinen Fragen.',
    options: [{
        name: 'question',
        description: 'Ask me a Question!',
        type: 3,
        require: true,
    }],
    run: async(client, interaction, guild, args) => {
        var rand = ['8ball: It is certain..', 
        '8ball: Auf keinen Fall.', 
        '8ball: Korrekt.', 
        '8ball: Unmöglich.', 
        '8ball: Natürlich.', 
        '8ball: Ich glaube nicht, dass das so ist..', 
        '8ball: Das ist wahr.', 
        '8ball: Das ist falsch.', 
        '8ball: Ich bin mir dessen sehr sicher.', 
        '8ball: Daran habe ich großen Zweifel.', 
        '8ball: Quellen verweisen auf nein', 
        '8ball: Theorien beweisen dies.', 
        '8ball: Das ist mir noch nicht ganz klar. Frag später noch mal', 
        '8ball: Frag später nochmal', 
        '8ball: Das sag ich dir jetzt besser nicht', 
        '8ball: Kann zurzeit nicht vorhergesagt werden', 
        '8ball: Konzentriere dich und stell die Frage noch mal.']
		var randItem = rand[Math.floor(Math.random()*rand.length)];
        interaction.followUp("Q: " + args[0] + "\nA: " + randItem);
    }
}