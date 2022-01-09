const client = require("..");


client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
        // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Reaction Roles Handling
    if (interaction.isSelectMenu()) {
      if(interaction.customID !== 'reaction-roles') return;
      await interaction.deferReply({ ephemeral: true });
      const roleID = interaction.values[0];
      const role = interaction.guild.roles.cache.get(roleID)
      const memberRoles = interaction.member.roles;

      const hasRole = interaction.memberRoles.cache.has(roleID);

      if(hasRole){
        interaction.memberRoles.remove(roleID);
        interaction.editReply(`${role.name} has been removed from you!!`)
      } else {
        memberRoles.add(roleID)
        interaction.editReply(`${role.name} has been added to you!!`)
      }
    } 
}); 