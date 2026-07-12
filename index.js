const mineflayer = require('mineflayer');
const http = require('http');

// Web server to give UptimeRobot something to ping
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot server is running!');
});
server.listen(3000, () => console.log('Keep-alive server active on port 3000'));

// Minecraft Bot Configuration
function createBot() {
    const bot = mineflayer.createBot({
        host: 'Kohakkun.aternos.me', 
        port: 64355,                  
        username: 'AFK_Robot_Bot',    
        version: false                
    });

    bot.on('spawn', () => {
        console.log('Bot successfully joined Kohakkun!');
        
        // Anti-AFK Action: Makes the bot jump every 30 seconds
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    // Auto-reconnect loop if kicked or if the server restarts
    bot.on('end', () => {
        console.log('Disconnected. Retrying connection in 15 seconds...');
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => console.log('Error encountered:', err));
}

createBot();
