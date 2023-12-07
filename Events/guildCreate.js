module.exports = async (client, guild) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "guildCreate") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
}