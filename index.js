const bedrock = require('bedrock-protocol');
const http = require('http');

// Web server to give UptimeRobot something to ping
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot server is running!');
});
server.listen(3000, () => console.log('Keep-alive server active on port 3000'));

function createBot() {
    console.log('Connecting directly to Kohakkun Bedrock server...');
    
    const client = bedrock.createClient({
        host: 'Kohakkun.aternos.me',
        port: parseInt(process.env.PORT_MC) || 19132,
        username: 'Natan',
        offline: true,        // For cracked mode
        skipPing: true        // <-- FORCE BYPASS THE JAVA PING TIMEOUT
    });

    client.on('spawn', () => {
        console.log('Bot successfully joined Kohakkun Bedrock server!');
    });

    // Auto-reconnect loop if kicked or if the server restarts
    client.on('close', (reason) => {
        console.log(`Connection closed. Retrying in 15 seconds...`);
        setTimeout(createBot, 15000);
    });

    client.on('error', (err) => {
        // Suppress benign connection errors so the bot doesn't spam logs
        console.log('Network event noticed:', err.message);
    });
}

createBot();
