exports.run = async (client, interaction, args, BD) => {
    const text = args.fields.get('test').value;
    await interaction.deferReply({ ephemeral: true });
    await interaction.editReply(text);
}