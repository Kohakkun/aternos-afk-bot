const mineflayer = require('mineflayer');
const http = require('http');

// 1. Keep-Alive Web Server for UptimeRobot
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is alive!');
});
server.listen(3000, () => console.log('Keep-alive web server running on port 3000'));

// 2. Configure Your Minecraft Bot
function createBot() {
    const bot = mineflayer.createBot({
        host: 'Kohakkun.aternos.me', // <-- CHANGE TO YOUR ATERNOS IP
        username: 'AFK_Bang',         // Name of the bot in-game
        version: false                       // Auto-detects server version
    });

    bot.on('spawn', () => {
        console.log('Bot successfully joined the server!');
        
        // Anti-AFK behavior: Makes the bot jump randomly every 30 seconds
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    // Automatically reconnect if kicked or if the server restarts
    bot.on('end', () => {
        console.log('Disconnected. Reconnecting in 15 seconds...');
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => console.log('Bot encountered an error:', err));
}

createBot();
