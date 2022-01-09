const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('bot online yay boy!!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);

const { Client, Message, MessageEmbed, Collection, MessageAttachment } = require("discord.js");
const Enmap = require("enmap");
const colors = require("colors");
const moment = require("moment");
const simplydjs = require("simply-djs");
const { color, footertext, footericon  } = require("./config/embed.json");
const canvas = require("discord-canvas"),
welcomeCanvas = new canvas.Welcome();
const welcomer = require('./models/welcomer.js');

const fs = require("fs");
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});
module.exports = client;

const config = require("./config/config.json");
const setting = require("./setting.js");

const prefix = config.prefix;
const token = config.token;
// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

// pokemon database
client.pokemon = new Enmap({
  name: "pokemon_database",
  autoEnsure: {
    user: null,
    pokemon: null,
    active: false
  }
});


// Initializing the project


const CurrencySystem = require("currency-system");
client.cs = new CurrencySystem;
CurrencySystem.cs.on('debug', (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
});
client.cs.setMongoURL(setting.mongoSrv);
client.cs.setDefaultWalletAmount('500');
client.cs.setDefaultBankAmount('1000');
client.cs.setMaxBankAmount(10000000);
client.cs.setMaxWalletAmount(10000000);

client.on("guildMemberAdd", async member =>{
  const data = await welcomer.findOne({ Guild: member.guild.id });
    if (!data) return;

    if (!client.channels.cache.get(data.Channel)) return;

    const channel = client.channels.cache.get(data.Channel);
    
let image = await welcomeCanvas
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(member.user.displayAvatarURL({dynamic:false , format: 'jpg',size: 512}))
      .setColor("border", "#ff0000")
      .setColor("username-box", "#ff0000")
      .setColor("discriminator-box", "#ff0000")
      .setColor("message-box", "#ff0000")
      .setColor("title", "#ff0000")
      .setColor("avatar", "#ff0000")
      .setBackground("https://media.discordapp.net/attachments/773005768458764349/789056032767868929/9016087.jpg")
      .toAttachment();
       
    let attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");

    const welbed = new MessageEmbed()
    .setColor(color)
    .setDescription(`**• **ID: **${member.user.id}**\n**• **Bot: **${member.user.bot ? 'Yes' : 'No'}**\n**• **Created At: **${moment(member.user.createdAt).format('MMMM Do YYYY, H:mm:ss a')}**`)
     
    channel.send({ content: `Welcome ${member.user} To The Server`, embeds: [welbed], files: [attachment] });
});

client.login(token);  
