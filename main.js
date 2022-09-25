//                                                      /$$
//                                                     | $$
//  /$$$$$$$  /$$$$$$$         /$$$$$$$ /$$   /$$  /$$$$$$$  /$$$$$$
// /$$_____/ /$$_____/        /$$_____/| $$  | $$ /$$__  $$ /$$__  $$
//|  $$$$$$ | $$             |  $$$$$$ | $$  | $$| $$  | $$| $$  \ $$
// \____  $$| $$              \____  $$| $$  | $$| $$  | $$| $$  | $$
// /$$$$$$$/|  $$$$$$$        /$$$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$/
//|_______/  \_______//$$$$$$|_______/  \______/  \_______/ \______/
//                   |______/
//
//              Discord Bot for my own Discord Server.
//							Version: 1.0.0
//				Support: https://discord.gg/PRwfUW5
//
//Invite Link:https://discord.com/api/oauth2/authorize?client_id=966256161571618897&permissions=1644133088471&scope=bot%20applications.commands

const { Discord, Client, Collection, MessageEmbed, Intents, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client(
    { 
        intents: 32767,
        partials: [
            "MESSAGE",
            "CHANNEL",
            "REACTION",
            "User",
            "GuildMember",
            "ThreadMember"
        ]
    });

    //Conncet to database
    (async () => {
        await require("./Database/connect")();
    })();

//import
require('dotenv').config();
const fs = require('fs');

const { TOKEN, PREFIX } = require('./config.json');

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands");
client.events = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json');

module.exports = client;

["commands", "events", "slash"].forEach(handler => {
    require(`./structures/${handler}`)(client);  
});

client.on('ready', () => {
  console.log(`[READY] ${client.user.tag} is ready`);
})

process.on('unhandledRejection', err => {
    console.log(`[ERROR] Unhandled Promise Rejection: ${err.message}.`);
    console.log(err);
});

client.login(TOKEN);