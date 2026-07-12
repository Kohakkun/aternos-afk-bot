const bedrock = require('bedrock-protocol');

function startBot() {
    console.log('Connecting directly to Kohakkun Bedrock server via background worker...');
    
    const client = bedrock.createClient({
        host: 'Kohakkun.aternos.me',
        port: 64355, 
        username: 'AFK_Robot_Bot',
        offline: true,        
        skipPing: true,
        connectTimeout: 30000 // Increases the threshold to combat slow cloud responses
    });

    client.on('spawn', () => {
        console.log('Bot successfully joined Kohakkun Bedrock server!');
    });

    client.on('close', (reason) => {
        console.log(`Connection dropped: ${reason}. Retrying in 20 seconds...`);
        process.exit(1); // Triggers index.js to spawn a fresh, clean connection worker
    });

    client.on('error', (err) => {
        console.log('Background network log:', err.message);
    });
}

// Delay startup slightly to give Render time to complete network binding
setTimeout(startBot, 5000);
