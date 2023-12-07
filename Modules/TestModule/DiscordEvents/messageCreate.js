module.exports = async (client, message) => {
    // Игнорировать если у сообщения нет сервера (личные сообщения боту):
    if (!message.guild) return;

    // Игнорировать ботов:
    if (message.author.bot) return;

    console.log(`${message.author.displayName}: ${message.content}`);
};