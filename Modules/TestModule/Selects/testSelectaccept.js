exports.run = async (client, interaction, args, BD) => {
    await interaction.deferUpdate({ ephemeral: true });
    const text = args;
    await interaction.editReply(`Вы успешно выбрали ${text}`);
}