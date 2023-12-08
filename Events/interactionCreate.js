module.exports = async (client, interaction) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key[1] == "interactionCreate") {
            try {
                let DisEvents = require(`${key[2]}`);
                DisEvents(client, interaction, client.BD);
            }
            catch (error) {
                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
            }
        }
    });

    if (interaction.isChatInputCommand()) {
        const SlashCommand = interaction.commandName;
        const cmd = client.SlashCommands.get(SlashCommand);
        if (!cmd) {
            interaction.reply({
                "content": null,
                "embeds": [
                    {
                        "description": `> ${interaction.user} Такой команды нет!`,
                        "color": client.config.EmbedColor,
                    }
                ], ephemeral: true
            });
            return;
        } else {
            try {
                await cmd.execute(client, interaction, client.BD);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        "content": null,
                        "embeds": [
                            {
                                "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                "color": client.config.EmbedColor,
                            }
                        ], ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        "content": null,
                        "embeds": [
                            {
                                "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                "color": client.config.EmbedColor,
                            }
                        ], ephemeral: true
                    });
                }
            }
        }
    }
    else if (interaction.isButton()) {
        let prefix = '!';
        if (!interaction.customId.startsWith(prefix, 0)) {
            const Button = interaction.customId.split(':')[0];
            const cmd = client.Buttons.get(Button);
            if (!cmd) {
                interaction.reply({
                    "content": null,
                    "embeds": [
                        {
                            "description": `> ${interaction.user} Такой команды нет!`,
                            "color": client.config.EmbedColor,
                        }
                    ], ephemeral: true
                });
                return;
            } else {
                try {
                    await cmd.run(client, interaction, client.BD);
                } catch (error) {
                    console.error(error);
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({
                            "content": null,
                            "embeds": [
                                {
                                    "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                    "color": client.config.EmbedColor,
                                }
                            ], ephemeral: true
                        });
                    } else {
                        await interaction.reply({
                            "content": null,
                            "embeds": [
                                {
                                    "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                    "color": client.config.EmbedColor,
                                }
                            ], ephemeral: true
                        });
                    }
                }
            }
        }
    }
    else if (interaction.isModalSubmit()) {
        let prefix = '!';
        if (!interaction.customId.startsWith(prefix, 0)) {
            const args = interaction.fields;
            const Modal = interaction.customId;
            const cmd = client.Modals.get(Modal);
            if (!cmd) {
                interaction.reply({
                    "content": null,
                    "embeds": [
                        {
                            "description": `> ${interaction.user} Такой команды нет!`,
                            "color": client.config.EmbedColor,
                        }
                    ], ephemeral: true
                });
                return;
            } else {
                try {
                    await cmd.run(client, interaction, args, client.BD);
                } catch (error) {
                    console.error(error);
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({
                            "content": null,
                            "embeds": [
                                {
                                    "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                    "color": client.config.EmbedColor,
                                }
                            ], ephemeral: true
                        });
                    } else {
                        await interaction.reply({
                            "content": null,
                            "embeds": [
                                {
                                    "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                    "color": client.config.EmbedColor,
                                }
                            ], ephemeral: true
                        });
                    }
                }
            }
        }
    }
    else if (interaction.isStringSelectMenu() || interaction.isUserSelectMenu() || interaction.isRoleSelectMenu() || interaction.isChannelSelectMenu()) {
        let prefix = '!';
        if (!interaction.customId.startsWith(prefix, 0)) {
            const args = interaction.values;
            const Select = interaction.customId;
            const cmd = client.Selects.get(Select);
            if (!cmd) {
                interaction.reply({
                    "content": null,
                    "embeds": [
                        {
                            "description": `> ${interaction.user} Такой команды нет!`,
                            "color": client.config.EmbedColor,
                        }
                    ], ephemeral: true
                });
                return;
            } else {
                try {
                    await cmd.run(client, interaction, args, client.BD);
                } catch (error) {
                    console.error(error);
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({
                            "content": null,
                            "embeds": [
                                {
                                    "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                    "color": client.config.EmbedColor,
                                }
                            ], ephemeral: true
                        });
                    } else {
                        await interaction.reply({
                            "content": null,
                            "embeds": [
                                {
                                    "description": `> ${interaction.user} Произошла ошибка при обработке данного действия!`,
                                    "color": client.config.EmbedColor,
                                }
                            ], ephemeral: true
                        });
                    }
                }
            }
        }
    }
    else return;
};