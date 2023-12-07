module.exports = async (client, channel) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "channelCreate") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
};