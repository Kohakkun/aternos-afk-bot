const bedrock = require('bedrock-protocol');
const http = require('http');

// Web server to give UptimeRobot something to ping
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot server is running!');
});
server.listen(3000, () => console.log('Keep-alive server active on port 3000'));

function createBot() {
    console.log('Attempting to connect to Bedrock server...');
    
    const client = bedrock.createClient({
        host: 'Kohakkun.aternos.me',
        port: 64355,
        username: 'AFK_Robot_Bot',
        offline: true // Enables Cracked / Offline mode connection
    });

    client.on('spawn', () => {
        console.log('Bot successfully joined Kohakkun Bedrock server!');
    });

    // Auto-reconnect loop if kicked or if the server restarts
    client.on('close', (reason) => {
        console.log(`Disconnected: ${reason}. Retrying connection in 15 seconds...`);
        setTimeout(createBot, 15000);
    });

    client.on('error', (err) => {
        console.log('Error encountered:', err.message);
    });
}

createBot();
