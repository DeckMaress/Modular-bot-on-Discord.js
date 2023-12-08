module.exports = async (client, oldState, newState) => {
        // Игнорировать если у сообщения нет сервера (личные сообщения боту):
        if (!newState.member.guild || !oldState.member.guild) return;

        // Игнорировать ботов:
        if (newState.member.bot || oldState.member.bot) return;

        // Загрузчик событий дискорда из модулей:
        client.DiscordEvents.forEach((value, key) => {
                if (key[1] == "voiceStateUpdate") {
                        try {
                                let DisEvents = require(`${key[2]}`);
                                DisEvents(client, oldState, newState, client.BD);
                        }
                        catch (error) {
                                console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
                        }
                }
        });
}