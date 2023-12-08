module.exports = async (client, oldChannel, newChannel) => {
    if (oldChannel.name == newChannel.name) return;
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key[1] == "channelUpdate") {
            try {
                let DisEvents = require(`${key[2]}`);
                DisEvents(client, oldChannel, newChannel, client.BD);
            }
            catch (error) {
                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
            }
        }
    });
};