// Токен бота:
const config = require("./Config/config.json");

// Модуль работы с файлами:
const fs = require("fs");

// Создание пользователя:
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

// Подключение к БД:
client.BD = require('./Config/BD.js');

// Цвета консоли:
client.ConsoleColors = {
    Reset: "\x1b[0m", Bright: "\x1b[1m", Dim: "\x1b[2m", Underscore: "\x1b[4m", Blink: "\x1b[5m", Reverse: "\x1b[7m", Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m", FgRed: "\x1b[31m", FgGreen: "\x1b[32m", FgYellow: "\x1b[33m", FgBlue: "\x1b[34m", FgMagenta: "\x1b[35m", FgCyan: "\x1b[36m", FgWhite: "\x1b[37m", FgGray: "\x1b[90m",
    BgBlack: "\x1b[40m", BgRed: "\x1b[41m", BgGreen: "\x1b[42m", BgYellow: "\x1b[43m", BgBlue: "\x1b[44m", BgMagenta: "\x1b[45m", BgCyan: "\x1b[46m", BgWhite: "\x1b[47m", BgGray: "\x1b[100m",
}

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
            if (Module == "!Disabled") return;
            console.log(client.ConsoleColors.FgCyan, `████ Загружаю модуль: ${Module} ████`, client.ConsoleColors.Reset);
            fs.readdirSync(`./Modules/${Module}`).forEach(function (file) {
                switch (`${file}`) {
                    case 'Commands':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены префиксные команды! Начинаю загружать.`, client.ConsoleColors.Reset);
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
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружена префиксная команда: ${commandName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    case 'SlashCommands':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены (/) команды! Начинаю загружать.`, client.ConsoleColors.Reset);
                        const SlashCommands = fs.readdirSync(`./Modules/${Module}/SlashCommands`).filter(file => file.endsWith(".js"));
                        for (const scmd of SlashCommands) {
                            const SlashCommandName = scmd.split(".")[0];
                            const SlashCommand = require(`./Modules/${Module}/SlashCommands/${scmd}`);
                            SlashCommandsarr.push(SlashCommand.data.toJSON());
                            client.SlashCommands.set(SlashCommandName, SlashCommand);
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружена (/) команда: ${SlashCommandName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    case 'Buttons':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены кнопки! Начинаю загружать.`, client.ConsoleColors.Reset);
                        const Buttons = fs.readdirSync(`./Modules/${Module}/Buttons`).filter(file => file.endsWith(".js"));
                        for (const btn of Buttons) {
                            const ButtonName = btn.split(".")[0];
                            const Button = require(`./Modules/${Module}/Buttons/${btn}`);
                            client.Buttons.set(ButtonName, Button);
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружена кнопка: ${ButtonName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    case 'Modals':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены модальные окна! Начинаю загружать.`, client.ConsoleColors.Reset);
                        const Modals = fs.readdirSync(`./Modules/${Module}/Modals`).filter(file => file.endsWith(".js"));
                        for (const mod of Modals) {
                            const ModalName = mod.split(".")[0];
                            const Modal = require(`./Modules/${Module}/Modals/${mod}`);
                            client.Modals.set(ModalName, Modal);
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружено модальное окно: ${ModalName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    case 'Selects':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены кнопки выбора из списка! Начинаю загружать.`, client.ConsoleColors.Reset);
                        const Selects = fs.readdirSync(`./Modules/${Module}/Selects`).filter(file => file.endsWith(".js"));
                        for (const slcts of Selects) {
                            const SelectName = slcts.split(".")[0];
                            const Select = require(`./Modules/${Module}/Selects/${slcts}`);
                            client.Selects.set(SelectName, Select);
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружен список: ${SelectName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    case 'config.json':
                        console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружен конфиг модуля.`, client.ConsoleColors.Reset);
                        break;
                    case 'description.json':
                        console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружено описание модуля.`, client.ConsoleColors.Reset);
                        break;
                    case 'DiscordEvents':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены Discord эвенты! Начинаю загружать.`, client.ConsoleColors.Reset);
                        const DiscordEvents = fs.readdirSync(`./Modules/${Module}/DiscordEvents`).filter(file => file.endsWith(".js"));
                        for (const DisEvents of DiscordEvents) {
                            const DiscordEventName = DisEvents.split(".")[0];
                            const DiscordEvent = require(`./Modules/${Module}/DiscordEvents/${DisEvents}`);
                            client.DiscordEvents.set([`${Module}`, DiscordEventName, `../Modules/${Module}/DiscordEvents/${DisEvents}`]);
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружен Discord эвент: ${DiscordEventName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    case 'CustomEvents':
                        console.log(client.ConsoleColors.FgYellow, `▼ ▽ ${Module}: Обнаружены Custom эвенты! Начинаю загружать.`, client.ConsoleColors.Reset);
                        const CustomEvents = fs.readdirSync(`./Modules/${Module}/CustomEvents`).filter(file => file.endsWith(".js"));
                        for (const CusDisEvents of CustomEvents) {
                            const CustomEventName = CusDisEvents.split(".")[0];
                            const CustomEvent = require(`./Modules/${Module}/CustomEvents/${CusDisEvents}`);
                            client.CustomEvents.set([`${Module}`, CustomEventName, `../Modules/${Module}/CustomEvents/${CusDisEvents}`]);
                            console.log(client.ConsoleColors.FgGray, `◈ ${Module}: Загружен Custom эвент: ${CustomEventName}.`, client.ConsoleColors.Reset);
                        }
                        break;
                    default:
                        console.log(client.ConsoleColors.FgRed, `▼ ▽ ${Module}: Обнаружен: ${file}, который не вызывается загрузчиком модулей! Убедитесь, что вы вызвали его в своём модуле сами.`, client.ConsoleColors.Reset);
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