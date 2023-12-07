const { ActivityType } = require('discord.js');
module.exports = async (client) => {
  // Загрузчик событий дискорда из модулей:
  client.DiscordEvents.forEach((value, key) => {
    if (key == "ready") {
      const DisEvents = require(`${value}`);
      DisEvents(client, message, client.BD);
    }
  });

  // Загрузка цикличных событий из модулей (CustomEvents):
  client.CustomEvents.forEach((value, key) => {
    const CusDisEvents = require(`${value}`);
    CusDisEvents(client, client.BD);
  });

  // Вывод в консоль о запуске бота:
  let ram = '';
  let text = `${client.user.displayName} Смотрит за ${client.channels.cache.size} каналами на ${client.guilds.cache.size} серверах, Общее количество участников ${client.users.cache.size}.   ✔`;
  for (let i = 0; i < text.length + 2; i++) {
    ram += '━'
  }
  console.log(`
  ┏${ram}┓
  ┃ ${text} ┃
  ┗${ram}┛`);

  // установка активности бота: 
  client.user.setPresence({ activities: [{ name: `${client.config.activities}`, type: ActivityType.Playing }], status: 'online', });
}