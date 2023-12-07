module.exports = async (client, error) => {
    console.log(error);
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key == "error") {
            const DisEvents = require(`${value}`);
            DisEvents(client, message, client.BD);
        }
    });
};