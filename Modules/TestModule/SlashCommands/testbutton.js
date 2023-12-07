const { SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('testbutton')
        .setDescription('Тест кнопка.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(client, interaction, BD) {
        await interaction.deferReply();
        await interaction.deleteReply();
        let button = new ActionRowBuilder();
        button.addComponents(
            new ButtonBuilder()
                .setCustomId('testbutton')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Тест')
        );
        await interaction.channel.send({ components: [button] }).catch(error => { });
    },
};