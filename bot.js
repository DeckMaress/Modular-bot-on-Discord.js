// Токен бота:
const config = require("./Config/config.json");

// Модуль работы с файлами:
const fs = require("fs");

// Создание пользователя для бота:
const { Client, Collection, GatewayIntentBits, Partials, REST, Routes } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
    ], partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
    ]
});

// Конфиг бота:
client.config = config;

// Подключение к БД: (Для выполнения sql запросов)
client.BD = require('./Config/BD.js');

// События бота:
const Events = fs.readdirSync('./Events').filter(file => file.endsWith(".js"));
for (const file of Events) {
    const eventName = file.split(".")[0];
    const event = require(`./Events/${file}`);
    client.on(eventName, event.bind(null, client));
}

// Колекции бота (Не трогать!):
client.Commands = new Collection();
const SlashCommandsarr = [];
client.SlashCommands = new Collection();
client.Buttons = new Collection();
client.Modals = new Collection();
client.Selects = new Collection();
client.DiscordEvents = new Collection();
client.CustomEvents = new Collection();

// Загрузка модулей:
fs.access("./Modules", function (error) {
    if (error) {
        console.log("Папка Modules не найдена");
    } else {
        console.log("Папка Modules найдена. Начинаю загружать модули.");
        fs.readdirSync("./Modules").forEach(function (Module) {
            console.log(`◘ Загружаю модуль: ${Module}`);
            fs.readdirSync(`./Modules/${Module}`).forEach(function (file) {
                switch (`${file}`) {
                    case 'Commands':
                        console.log(`○ ${Module}: Обнаружены префиксные команды! Начинаю загружать.`);
                        var tempCommands = new Collection();
                        tempCommands = fs.readdirSync(`./Modules/${Module}/Commands`).filter(file => file.endsWith(".js"));
                        for (const cmd of tempCommands) {
                            const commandName = cmd.split(".")[0];
                            const command = require(`./Modules/${Module}/Commands/${cmd}`);
                            if (Object.entries(command).length === 0) {
                                console.log(`Ошибка в ./Modules/${Module}/Commands/${cmd} ! Нет принимающей конструкции. Посмотрите в примере модулей.`)
                                continue;
                            }
                            client.Commands.set(commandName, command);
                            console.log(`• ${Module}: Загружена префиксная команда: ${commandName}.`);
                        }
                        break;
                    case 'SlashCommands':
                        console.log(`○ ${Module}: Обнаружены (/) команды! Начинаю загружать.`);
                        const SlashCommands = fs.readdirSync(`./Modules/${Module}/SlashCommands`).filter(file => file.endsWith(".js"));
                        for (const scmd of SlashCommands) {
                            const SlashCommandName = scmd.split(".")[0];
                            const SlashCommand = require(`./Modules/${Module}/SlashCommands/${scmd}`);
                            SlashCommandsarr.push(SlashCommand.data.toJSON());
                            client.SlashCommands.set(SlashCommandName, SlashCommand);
                            console.log(`• ${Module}: Загружена (/) команда: ${SlashCommandName}.`);
                        }
                        break;
                    case 'Buttons':
                        console.log(`○ ${Module}: Обнаружены кнопки! Начинаю загружать.`);
                        const Buttons = fs.readdirSync(`./Modules/${Module}/Buttons`).filter(file => file.endsWith(".js"));
                        for (const btn of Buttons) {
                            const ButtonName = btn.split(".")[0];
                            const Button = require(`./Modules/${Module}/Buttons/${btn}`);
                            client.Buttons.set(ButtonName, Button);
                            console.log(`• ${Module}: Загружена кнопка: ${ButtonName}.`);
                        }
                        break;
                    case 'Modals':
                        console.log(`○ ${Module}: Обнаружены модальные окна! Начинаю загружать.`);
                        const Modals = fs.readdirSync(`./Modules/${Module}/Modals`).filter(file => file.endsWith(".js"));
                        for (const mod of Modals) {
                            const ModalName = mod.split(".")[0];
                            const Modal = require(`./Modules/${Module}/Modals/${mod}`);
                            client.Modals.set(ModalName, Modal);
                            console.log(`• ${Module}: Загружено модальное окно: ${ModalName}.`);
                        }
                        break;
                    case 'Selects':
                        console.log(`○ ${Module}: Обнаружены кнопки выбора из списка! Начинаю загружать.`);
                        const Selects = fs.readdirSync(`./Modules/${Module}/Selects`).filter(file => file.endsWith(".js"));
                        for (const slcts of Selects) {
                            const SelectName = slcts.split(".")[0];
                            const Select = require(`./Modules/${Module}/Selects/${slcts}`);
                            client.Selects.set(SelectName, Select);
                            console.log(`• ${Module}: Загружен список: ${SelectName}.`);
                        }
                        break;
                    case 'config.json':
                        console.log(`• ${Module}: Загружен конфиг модуля.`);
                        break;
                    case 'description.json':
                        console.log(`• ${Module}: Загружено описание модуля.`);
                        break;
                    case 'DiscordEvents':
                        console.log(`○ ${Module}: Обнаружены Discord эвенты! Начинаю загружать.`);
                        const DiscordEvents = fs.readdirSync(`./Modules/${Module}/DiscordEvents`).filter(file => file.endsWith(".js"));
                        for (const DisEvents of DiscordEvents) {
                            const DiscordEventName = DisEvents.split(".")[0];
                            const DiscordEvent = require(`./Modules/${Module}/DiscordEvents/${DisEvents}`);
                            client.DiscordEvents.set(DiscordEventName, `../Modules/${Module}/DiscordEvents/${DisEvents}`);
                            console.log(`• ${Module}: Загружен Discord эвент: ${DiscordEventName}.`);
                        }
                        break;
                    case 'CustomEvents':
                        console.log(`○ ${Module}: Обнаружены Custom эвенты! Начинаю загружать.`);
                        const CustomEvents = fs.readdirSync(`./Modules/${Module}/CustomEvents`).filter(file => file.endsWith(".js"));
                        for (const CusDisEvents of CustomEvents) {
                            const CustomEventName = CusDisEvents.split(".")[0];
                            const CustomEvent = require(`./Modules/${Module}/CustomEvents/${CusDisEvents}`);
                            client.CustomEvents.set(CustomEventName, `../Modules/${Module}/CustomEvents/${CusDisEvents}`);
                            console.log(`• ${Module}: Загружен Custom эвент: ${CustomEventName}.`);
                        }
                        break;
                    default:
                        console.log(`○ ${Module}: Обнаружен: ${file}, который не вызывается загрузчиком модулей! Убедитесь, что вы вызвали его в своём модуле сами.`);
                }
            });
        });

        // Выгрузка (/) команд на Discord:
        const rest = new REST({ version: '9' }).setToken(client.config.token);
        (async () => {
            try {
                //console.log('◘ Началось обновление (/) команд.');
                await rest.put(
                    Routes.applicationCommands(client.config.clientId),
                    { body: SlashCommandsarr },
                );

                //console.log('◘ обновление (/) команд успешно завершено!');
            } catch (error) {
                console.error(error);
            }
        })();
    }
});
client.login(client.config.token);