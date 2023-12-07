const { SlashCommandBuilder, ActionRowBuilder, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('testmodal')
        .setDescription('Тест модального окна.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(client, interaction, BD) {
        const modal = new ModalBuilder()
            .setCustomId('testmodalaccept')
            .setTitle('Тест модального окна');
        const test = new TextInputBuilder()
            .setCustomId('test')
            .setLabel("・Что угодно:")
            .setValue("...")
            .setStyle(TextInputStyle.Short)
            .setMaxLength(30)
            .setRequired(true);
        const row = new ActionRowBuilder().addComponents(test);
        modal.addComponents(row);
        await interaction.showModal(modal).catch(error => { });
    },
};