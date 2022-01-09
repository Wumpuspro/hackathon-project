const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { UniqueID } = require('nodejs-snowflake');
const { color,  footertext, footericon  } = require("../../config/embed.json");

module.exports = {
    name: "timedif",
    description: "Shows Time Differnce Between Two Messages!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'id',
        description: 'Id Of First Message ?',
        type: 'STRING',
        required: true
      },
      {
        name: 'id2',
        description: 'Id Of Second Message ?',
        type: 'STRING',
        required: true
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
let time1 = args[0];
    let time2 = args[1];
    const uid = new UniqueID(time1);
    const t1 = uid.getTimestampFromID(time1);

    const uid2 = new UniqueID(time2);
    const t2 = uid2.getTimestampFromID(time2);

        if(!time1) {
       return interaction.editReply("missing arguments") 

       }   else if (!time2) {
        return interaction.editReply("Missing arguments") 
    }
    else{
        const embed = new MessageEmbed()
        .setTitle('Time Difference')
        .setColor("#1a8cff")
        .setDescription(`${(t2-t1)/1000} seconds`)
        .setFooter(footertext);
      interaction.editReply({ embeds: [embed] });
    }
}}


