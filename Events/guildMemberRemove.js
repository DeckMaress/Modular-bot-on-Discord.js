module.exports = async (client, member) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "guildMemberRemove") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
}