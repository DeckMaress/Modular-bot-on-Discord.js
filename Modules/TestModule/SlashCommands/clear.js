const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Очистка канала от сообщений!')
        .addIntegerOption(option => option.setName('count').setDescription('Укажите кол-во сообщений, которые надо удалить: [1-99]').setRequired(true).setMinValue(1).setMaxValue(99))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true }).catch(error => { });
        const count = interaction.options.getInteger('count');
        await interaction.channel.bulkDelete(count).catch(async error => {
            return await interaction.editReply({ content: `Нельзя удалить слишком старые сообщения!`, ephemeral: true }).catch(error => { });
        });
        await interaction.editReply({ content: `[${count}] сообщений успешно удалены!`, ephemeral: true }).catch(error => { });
    },
};