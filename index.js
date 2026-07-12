const http = require('http');
const { spawn } = require('child_process');

// Keep-alive web server for Render and UptimeRobot
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Web listener active.');
});

server.listen(3000, () => {
    console.log('Keep-alive server successfully bound to port 3000');
    
    // Boot the Minecraft bot cleanly inside an independent background worker
    console.log('Spinning up background connection worker...');
    const botProcess = spawn('node', ['bot.js'], { stdio: 'inherit' });

    botProcess.on('close', (code) => {
        console.log(`Bot engine exited with code ${code}. Restarting worker...`);
        spawn('node', ['bot.js'], { stdio: 'inherit' });
    });
});
