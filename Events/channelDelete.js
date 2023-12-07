module.exports = async (client, channel) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "channelDelete") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
};