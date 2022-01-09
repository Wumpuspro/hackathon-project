const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
  name: "ping",
  aliases: ["pong"],
  categories: "other",
  permissions: " ",
  description: "Bot's Latency",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      message.channel.send({
        embeds: [new MessageEmbed()
        .setTitle("🏓 Pong!")
        .addField(`Discord: `, `\`${Date.now() - message.createdTimestamp}\` ms.`, true)
        .addField(`Websocket: `, `\`${client.ws.ping}\` ms.`, true)
        .setColor("2f3136")]
      })
  },
};