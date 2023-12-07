const path = require('path'); 
const config = require(path.join(__dirname, "../config.json"));
var conststartmonitor = 0;
var i = 0;
var timeInterval = 5000; // 1000 = 1 секунда.
module.exports = async function (client, BD) {
    if (config.TestEventCycleStatus === "Off") return; 
    if (conststartmonitor == 0) {
        console.log('◘◘◘ Event запущен');
        Event(timeInterval);
        conststartmonitor = 1;
        function Event(time) {
            var event = setInterval(async function () {
                console.log('◘◘◘ Event тест:' + i)
                i++
            }, time);

        };

    }

} 