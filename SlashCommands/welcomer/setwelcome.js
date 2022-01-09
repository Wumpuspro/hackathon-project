const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, footertext, footericon  } = require("../../config/embed.json");
const Schema = require('../../models/welcomer.js');

module.exports = {
    name: "set-welcomer",
    description: "Sets A Channel For Welcoming New Users!!",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'channel',
            description: 'Select A Channel For Welcomer!',
            type: 'CHANNEL',
            required: true,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {        
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            const channel = interaction.options.getChannel('channel')
        
            Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (data) data.delete();
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                }).save();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Welcomer Channel')
                .setDescription(`Successfully Set ${channel} As Welcomer Channel!`)
                .setFooter(footertext)
                interaction.editReply({ embeds: [embed] });
            });
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
