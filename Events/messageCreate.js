module.exports = async (client, message) => {
    // Игнорировать если у сообщения нет сервера (личные сообщения боту):
    if (!message.guild) return;

    // Игнорировать ботов:
    if (message.author.bot) return;

    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "messageCreate") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });

    // Вызов команд:
    let prefix = client.config.prefix;
    if (message.content.startsWith(prefix, 0)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.Commands.get(command);
        if (!cmd) {
            return;
        } else {
            cmd.run(client, message, args, client.BD);
        }
    }
};