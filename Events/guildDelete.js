module.exports = async (client, guild) => {
    if (guild.available) {
        // Загрузчик событий дискорда из модулей:
        client.DiscordEvents.forEach((value, key) => {
            if (key[1] == "guildDelete") {
                try {
                    let DisEvents = require(`${key[2]}`);
                    DisEvents(client, guild, client.BD);
                }
                catch (error) {
                    console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
                }
            }
        });
    }
}