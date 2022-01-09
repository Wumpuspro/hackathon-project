const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color,footertext, footericon  } = require("../../config/embed.json");

module.exports = {
    name: "welcomer",
    description: "Shows Welcomer Config Of This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const embed = new MessageEmbed()
      .setTitle(`Welcomer Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/set-autorole', value: 'Sets A Channel For Welcoming New Users!' },
    { name: '/remove-welcomer', value: 'Removes Welcomer System On This Server!' },
	)
  .setFooter(footertext)

  interaction.editReply({ embeds: [embed] });
    },
};
