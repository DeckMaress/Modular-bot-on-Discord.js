module.exports = async (client, oldChannel, newChannel) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "channelUpdate") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
};