const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const ms = require('ms');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbd')
        .setDescription('Тест работы с БД')
        .setDMPermission(false)
        .addStringOption(option => option.setName('fields').setDescription('Какие поля:').setRequired(true))
        .addStringOption(option => option.setName('table').setDescription('Какая таблица:').setRequired(true)),
    async execute(client, interaction, BD) {
        await interaction.deferReply({ ephemeral: true })
        const fields = interaction.options.getString('fields');
        const table = interaction.options.getString('table');
        var result = await BD(`SELECT ${fields} FROM ${table}`);
        if (!result[0][0]) {
            await interaction.editReply("Ничего не найдено!");
            return;
        } else {
            console.log(result[0][0]);
            await interaction.editReply("Посмотрите в консоль")
        }
    },
};