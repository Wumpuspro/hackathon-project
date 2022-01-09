const Discord = module.require("discord.js");

module.exports = {
  name: "howgay",
  description: "Just for fun command",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let target = message.mentions.users.first()
      || message.author;

    let rng = Math.floor(Math.random() * 101);

    const howgayembed = new Discord.MessageEmbed()
      .setTitle(`Gay Rate Machine`)
      .setColor("RANDOM");

    if(target.id === message.author.id){
      howgayembed.setDescription(`You are `+ rng + "% gay 🏳️‍🌈")
      message.channel.send({ embeds: [howgayembed] });
    } else {
      howgayembed.setDescription(`${target.username} is `+ rng + "% gay 🏳️‍🌈")
      message.channel.send({ embeds: [howgayembed] });
    }
  },
};