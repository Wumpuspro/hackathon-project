const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color,  footertext, footericon  } = require("../../config/embed.json");
const Schema = require('../../models/welcomer.js');

module.exports = {
    name: "remove-welcomer",
    description: "Disables Welcomer In This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {        
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        
            Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.editReply(`Welcomer Is Not Setup In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Removed Welcomer')
                .setDescription(`Successfully Disabled Welcomer In This Server!`)
                .setFooter(footertext)
                .setThumbnail(footericon)
                interaction.editReply({ embeds: [embed] });
            });
        } else {
 client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
