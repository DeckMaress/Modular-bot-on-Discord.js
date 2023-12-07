const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Сказать что-то от имени бота')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Тип сообщения (поддерживает discohook')
                .setRequired(true)
                .addChoices(
                    { name: 'message', value: 'message' },
                    { name: 'embed', value: 'embed' },
                ))
        .addStringOption(option => option.setName('text').setDescription('Введите текст').setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(client, interaction, BD) {
        await interaction.deferReply({ ephemeral: true });
        const type = interaction.options.getString('type');
        const text = interaction.options.getString('text');
        if (type == 'embed') {
            let embed = '';
            if (text.startsWith('{', 0)) embed = JSON.parse(text);
            else {
                embed = {
                    "content": null,
                    "embeds": [
                        {
                            "description": text,
                            "color": client.config.EmbedColor,
                        }
                    ]
                }
            }
            await interaction.channel.send(embed).catch(async err => {
                return await interaction.editReply({ content: `Произошла ошибка!`, ephemeral: true }).catch();
            });
        }
        else {
            await interaction.channel.send(`${text}`).catch(async err => {
                return await interaction.editReply({ content: `Произошла ошибка!`, ephemeral: true }).catch();
            });
        }
        await interaction.deleteReply();
    },
};