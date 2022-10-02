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
//				Support: https://discord.gg/PRwfUW5
//
//Invite Link:https://discord.com/api/oauth2/authorize?client_id=966256161571618897&permissions=1644133088471&scope=bot%20applications.commands

const {
  Discord,
  Client,
  Collection,
  EmbedBuilder,
  Intents,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: 32767,
  partials: [User, Message, GuildMember, ThreadMember],
});

//Conncet to database
(async () => {
  await require("./Database/connect")();
})();

//import
require("dotenv").config();
const fs = require("fs");

const { TOKEN, PREFIX } = require("./config.json");

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands");
client.events = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

module.exports = client;

["commands", "events", "slash"].forEach((handler) => {
  require(`./structures/${handler}`)(client);
});

client.on("ready", () => {
  console.log(`[READY] ${client.user.tag} is ready`);
});

process.on("unhandledRejection", (err) => {
  console.log(`[ERROR] Unhandled Promise Rejection: ${err.message}.`);
  console.log(err);
});

client
  .login(TOKEN)
  .then(() => {
    console.log(`client logged in as ${client.user.username}`);
    client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`);
  })
  .catch((err) => console.log(err));
