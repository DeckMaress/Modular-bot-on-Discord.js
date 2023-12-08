module.exports = async (client, error) => {
    console.log(error);
    // Загрузчик событий дискорда из модулей:
    client.DiscordEvents.forEach((value, key) => {
        if (key[1] == "error") {
            try {
                let DisEvents = require(`${key[2]}`);
                DisEvents(client, error, client.BD);
            }
            catch (error) {
                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
            }
        }
    });
};