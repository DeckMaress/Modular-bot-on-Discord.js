module.exports = async (client, member) => {
    let guild = member.guild;
    if (!member.bot) {
        // Загрузчик событий дискорда из модулей:
        client.DiscordEvents.forEach((value, key) => {
            if (key[1] == "guildMemberAdd") {
                try {
                    let DisEvents = require(`${key[2]}`);
                    DisEvents(client, member, client.BD);
                }
                catch (error) {
                    console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
                }
            }
        });
    }
}