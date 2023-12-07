const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Покажет все команды'),
    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true }).catch(error => { });
        let text = "**Помощь по (/) командам:**\n";
        client.SlashCommands.forEach(SlashCommand => {
            text += `> - Команда: ${SlashCommand.data.name} | Описание команды: ${SlashCommand.data.description}\n`
        });
        await interaction.editReply({ content: text, ephemeral: true }).catch(error => { });
    },
};