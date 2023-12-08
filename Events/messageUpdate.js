module.exports = async (client, oldMessage, newMessage) => {
    // Игнорировать если у сообщения нет сервера (личные сообщения боту):
    if (!newMessage.guild) return;

    // Игнорировать ботов:
    if (newMessage.author?.bot) return;

    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key[1] == "messageUpdate") {
            try {
                let DisEvents = require(`${key[2]}`);
                DisEvents(client, oldMessage, newMessage, client.BD);
            }
            catch (error) {
                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
            }
        }
    });
};