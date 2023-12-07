module.exports = async (client, oldMessage, newMessage) => {
    // Игнорировать если у сообщения нет сервера (личные сообщения боту):
    if (!message.guild) return;

    // Игнорировать ботов:
    if (message.author.bot) return;
    
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "messageUpdate") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
};