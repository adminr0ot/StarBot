const { EmbedBuilder } = require("discord.js")
module.exports = {
    name: 'burn',
    description: 'Wenn willst du brennen sehen?',
    options: [{
        name: 'user',
        description: 'Provide user you want to burn',
        type: 6,
        require: true,
    }],
    run: async(client, interaction, guild, args, message) => {
    //Define Quote
        var quote = new Array();
        quote[0] = 'Sawyer funkt die Bodenstation an: „Hier die Freelancer MAX Academy I.\n Co-Pilot Sawyer hier. Pilot <@' + args[0] + '> kann gerade nicht sprechen. \nHaben Probleme mit unseren Triebwerken, Schiffsnase herunterdrücken? \nBodenstation: „<@' + args[0] + '> am Steuer? Drücken sie besser beide Daumen“';
        quote[1] = 'Was ist der Unterschied zwischen einer Fliege und <@' + args[0] + '>?\nDie Fliege klatscht von außen an die Scheibe.';
        quote[2] = 'Warum küsst <@' +  interaction.user.id + '> immer den Boden hach dem aussteigen aus dem Flieger?\n "Wohl noch nie mit <@' + args[0] + '> geflogen!"';
        quote[3] = '<@' + args[0] + '> kracht im Verse gegen einen Asteroiden. Totalschaden. <@' + args[0] + '> steigt aus und sagt: "Und ich hab\' noch gehupt!"';
        quote[4] = 'Was hört der Reclaimer Captain am liebsten? ... <@' + args[0] + '> am Steuer!';
        quote[5] = 'Warum läuft <@' + args[0] + '>\'s Schiffsversicherung länger als bei den anderen Citizen\'s? Weil die Ein- und Ausparkzeiten gut geschrieben werden!';
        quote[6] = 'Sawyer: "Hast du die Freelancer im Hangar gelandet?"\n<@' + args[0] + '>: "Na ja, zumindest die wichtigsten Teile"';
        quote[7] = 'Warum gibt es auf Hurston extra einen Hangar für <@' + args[0] + '>? Damit beim Ein- und Ausparken keine anderen Schiffe beschädigt werden!';
        quote[8] = 'Im Weltraum hört dich niemand schreien, aber in <@' + args[0] + '>\'s Hangar ist das Standard!';
        quote[9] = 'Flugkontrolle: „Höhe und Position?“\n<@' + args[0] + '>: „Ich bin 1,80 und sitze vorne links“';
        quote[10] = 'Flugkontrolle: "Haben Sie Probleme?"\n<@' + args[0] + '>: "Habe meinen Co-Piloten verloren."\nFlugkontrolle: "So wie Sie fliegen, haben Sie nicht nur den verloren."';
        quote[11] = 'Loreville Fluglehrer (Start/Landeübungen) zu <@' + args[0] + '>: "Sehen Sie zu, dass Sie innerhalb der beleuchteten Fläche bleiben."\nEin paar Minuten später: "Ach was, bleiben Sie wenigstens innerhalb der Grenzen von Hurston!"';
        quote[12] = 'Flugkontrolle zu <@' + args[0] + '>, nach einer besonders harten Landung: \n"Eine Landung soll ja kein Geheimnis sein. Die Passagiere sollen ruhig wissen, wann sie unten sind." \n<@' + args[0] + '>: "Macht nichts. Die klatschen eh immer."';
        quote[13] = 'Eine gute Landung bei <@' + args[0] + '> ist eine bei der <@' + args[0] + '> hinterher weggehen kann. Eine phantastische Landung ist eine bei der das Raumschiff danach noch flugfähig ist!'
        //Chose Quote
        var rand = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
        var randItem = rand[Math.floor(Math.random()*rand.length)];
        interaction.followUp(quote[randItem]);
    }
}