const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'weißheit',
    description: 'Erfahre wichtige Weißheiten.',
    //ToDo: change to modifiable setups
    run: async(client, interaction, guild, args) => {
        var rand = ['Konfuzius sagt: Tanke nie bei CryAstro, die hauen Dich übers Ohr!', 'Glaube keiner Roadmap, die Du nicht selbst gefälscht hast.', 'Sind die Bugs auch noch so schlimm, mit workarounds kriegst Du es hin.', 'Eine Vision wird dann Realität, wenn genug Menschen daran glauben.', 'Software Development: Einen Schritt vorwärts, zwei zurück. Hauptsache der Schritt voran ist groß genug.', 'Im Zweifel gilt immer: Der Server war schuld!', 'Darf ich was verraten? Es gibt Dinge, die sich nicht vertragen. Zum Beispiel Sawyer... und Granaten.', 'Star Citizen PTU: Wer nicht will, der hat schon. Wer schon hat, will nicht mehr.', 'Ich habe heute leider keine Weisheit für Dich.', 'VENI. VIDI. VUZYVERSE!', 'Böse Zungen behaupten, hinter Rest&Relax und CryAstro Services steckt das selbe Unternehmen.', 'Die erste Regel der Fliegerei: Liebe. Man kann die komplette Theorie vergessen, wenn man ein Schiff in die Luft bringen will, dass man nicht liebt, wird einem das nicht gelingen. Man hat nicht die geringste Chance. Aber Liebe hält sie in der Luft, auch wenn sie runterfallen sollte. Liebe lässt dich spüren was sie braucht. Liebe macht das Schiff zu einem Zuhause.', '\"Die erste Regel der Fliegerei: Liebe. Man kann die komplette Theorie vergessen, wenn man ein Schiff in die Luft bringen will, dass man nicht liebt, wird einem das nicht gelingen. Man hat nicht die geringste Chance. Aber Liebe hält sie in der Luft, auch wenn sie runterfallen sollte. Liebe lässt dich spüren was sie braucht. Liebe macht das Schiff zu einem Zuhause.\"\n~Captain Malcolm Reynolds, Serenity - Flucht in neue Welten', '\"Wenn ich meinen Feind so gut verstehe, dass ich ihn besiegen kann, dann liebe ich ihn in diesem Moment auch.\"\n~A.E.Wiggin'];
        var randItem = rand[Math.floor(Math.random()*rand.length)];
        interaction.followUp(randItem);
    }
}

function weisheiten(arguments, receivedMessage) {
    var rand = ['Konfuzius sagt: Tanke nie bei CryAstro, die hauen Dich übers Ohr!', 'Glaube keiner Roadmap, die Du nicht selbst gefälscht hast.', 'Sind die Bugs auch noch so schlimm, mit workarounds kriegst Du es hin.', 'Eine Vision wird dann Realität, wenn genug Menschen daran glauben.', 'Software Development: Einen Schritt vorwärts, zwei zurück. Hauptsache der Schritt voran ist groß genug.', 'Im Zweifel gilt immer: Der Server war schuld!', 'Darf ich was verraten? Es gibt Dinge, die sich nicht vertragen. Zum Beispiel Sawyer... und Granaten.', 'Star Citizen PTU: Wer nicht will, der hat schon. Wer schon hat, will nicht mehr.', 'Ich habe heute leider keine Weisheit für Dich.', 'VENI. VIDI. VUZYVERSE!', 'Böse Zungen behaupten, hinter Rest&Relax und CryAstro Services steckt das selbe Unternehmen.', 'Die erste Regel der Fliegerei: Liebe. Man kann die komplette Theorie vergessen, wenn man ein Schiff in die Luft bringen will, dass man nicht liebt, wird einem das nicht gelingen. Man hat nicht die geringste Chance. Aber Liebe hält sie in der Luft, auch wenn sie runterfallen sollte. Liebe lässt dich spüren was sie braucht. Liebe macht das Schiff zu einem Zuhause.', '\"Die erste Regel der Fliegerei: Liebe. Man kann die komplette Theorie vergessen, wenn man ein Schiff in die Luft bringen will, dass man nicht liebt, wird einem das nicht gelingen. Man hat nicht die geringste Chance. Aber Liebe hält sie in der Luft, auch wenn sie runterfallen sollte. Liebe lässt dich spüren was sie braucht. Liebe macht das Schiff zu einem Zuhause.\"\n~Captain Malcolm Reynolds, Serenity - Flucht in neue Welten', '\"Wenn ich meinen Feind so gut verstehe, dass ich ihn besiegen kann, dann liebe ich ihn in diesem Moment auch.\"\n~A.E.Wiggin'];
    var randItem = rand[Math.floor(Math.random()*rand.length)];
    interaction.followUp(randItem);
}