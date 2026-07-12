const bedrock = require("bedrock-protocol");
const http = require("http");

// Web listener to keep CodeSandbox active via UptimeRobot pings
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("CodeSandbox bot listener active.");
});

// CodeSandbox automatically assigns an environment port or defaults to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Keep-alive web listener running on port ${PORT}`);
});

function createBot() {
  console.log(
    "Connecting to Kohakkun Bedrock server from CodeSandbox environment..."
  );

  const client = bedrock.createClient({
    host: "Kohakkun.aternos.me",
    port: 64355, // Make sure this matches your dynamic Aternos port!

    username: "AFK_Robot_Bot",
    offline: true,
    skipPing: true,
  });

  client.on("spawn", () => {
    console.log("Success: Bot has entered the Bedrock server!");
  });

  client.on("close", (reason) => {
    console.log(
      `Disconnected: ${reason}. Attempting reconnect in 15 seconds...`
    );
    setTimeout(createBot, 15000);
  });

  client.on("error", (err) => {
    console.log("Network warning:", err.message);
  });
}

// Start the bot connection
createBot();
