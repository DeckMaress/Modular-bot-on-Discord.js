module.exports = async (client, channel) => {
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key[1] == "channelDelete") {
            try {
                let DisEvents = require(`${key[2]}`);
                DisEvents(client, channel, client.BD);
            }
            catch (error) {
                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
            }
        }
    });
};