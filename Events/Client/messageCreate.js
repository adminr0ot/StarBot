//import client vom main.js
const client = require('../../main.js');
const { PREFIX } = require('../../config.json');
const db = require('quick.db'); //TODO: maybe switch to mongoDB
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return; //Changed to Custom Prefix from DB
    if(!message.guild) return;
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if(prefix == null) {
        prefix = PREFIX;
    } else {
        prefix = prefix;
    };
    //Mention
    if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}`) {
        const embed = new MessageEmbed()
            .setTitle('Need help?')
            .setDescription(`My prefix in this server is ${prefix}, for more commands type \`${prefix}help\``);
            message.channel.send({ embeds: [embed]});
    }


    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
        //Owner Permission
        if(command.ownerOnly) {
            if(!client.config.OWNERID.includes(message.author.id)) {
                message.channel.send(`${message.member} You can't access owner commands`);
                return;
            }
        }

        //User Permission
        if(!message.member.permissions.has(command.userPerms || [])) return message.channel.send(`You don't have \`${command.userPerms || []}\` permission`);

        //Bot permission
        if(!message.guild.me.permissions.has(command.clientPerms || [])) return message.channel.send(`I don't have \`${command.clientPerms || []}\` permission`);
    }
    if(command) command.run(client, message, args, prefix);
})