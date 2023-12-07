const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('testselect')
        .setDescription('Тест выпадающий список.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(client, interaction, BD) {
        await interaction.deferReply({ ephemeral: true });
        let testSelect = new ActionRowBuilder();
        testSelect.addComponents(
            SelectList = new StringSelectMenuBuilder()
                .setCustomId(`testSelectaccept`)
                .setPlaceholder('Выбрать:')
                .setMinValues(1)
                .setMaxValues(2)
        );
        SelectList.addOptions({
            label: `Клевер`,
            emoji: { name: '🍀' },
            value: `Клевер`
        });
        SelectList.addOptions({
            label: `Джойстик`,
            emoji: { name: '🎮' },
            value: `Джойстик`
        });
        await interaction.editReply({ components: [testSelect] });
    },
};