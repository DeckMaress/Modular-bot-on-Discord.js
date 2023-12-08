module.exports = async (client, message) => {
    // Игнорировать если у сообщения нет сервера (личные сообщения боту):
    if (!message.guild) return;

    // Игнорировать ботов:
    if (message.author?.bot) return;

    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key[1] == "messageDelete") {
            try {
                let DisEvents = require(`${key[2]}`);
                DisEvents(client, message, client.BD);
            }
            catch (error) {
                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
            }
        }
    });
};