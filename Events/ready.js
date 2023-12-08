const { ActivityType } = require('discord.js');
module.exports = async (client) => {
  // Загрузчик событий дискорда из модулей:
  client.DiscordEvents.forEach((value, key) => {
    if (key[1] == "ready") {
      try {
        let DisEvents = require(`${key[2]}`);
        DisEvents(client, client.BD);
      }
      catch (error) {
        console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
      }
    }
  });

  // Загрузка цикличных событий из модулей (CustomEvents):
  client.CustomEvents.forEach((value, key) => {
    try {
      const CusDisEvents = require(`${key[2]}`);
      CusDisEvents(client, client.BD);
    }
    catch (error) {
      console.log(client.ConsoleColors.FgRed, `${error}`, client.ConsoleColors.Reset);
    }
  });

  // Вывод в консоль о запуске бота:
  let ram = '';
  let text = `${client.user.displayName} Смотрит за ${client.channels.cache.size} каналами на ${client.guilds.cache.size} серверах, Общее количество участников ${client.users.cache.size}.   ✔`;
  for (let i = 0; i < text.length + 2; i++) {
    ram += '━'
  }
  console.log(client.ConsoleColors.FgGreen, `
  ┏${ram}┓
  ┃ ${text} ┃
  ┗${ram}┛`, client.ConsoleColors.Reset);

  // установка активности бота: 
  client.user.setPresence({ activities: [{ name: `${client.config.activities}`, type: ActivityType.Playing }], status: 'online', });
}