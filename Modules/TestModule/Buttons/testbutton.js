exports.run = async (client, interaction, BD) => {
    await interaction.deferReply({ ephemeral: true }).catch();
    let guild = interaction.guild.id;
    await interaction.editReply({
        content: null,
        embeds: [
            {
                "description": `Вы тыкнули на тест кнопку:`,
                "color": client.config.EmbedColor,
            }
        ]
    }).catch();
}