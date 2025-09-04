require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client, GatewayIntentBits } = require("discord.js");


// --- Web API (Express) ---
const app = express();
app.use(cors()); // CORS açık
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => res.send("OK"));
app.get("/ping", (req, res) => {
res.json({ message: "Bot Railway’de çalışıyor 🚀" });
});


app.listen(PORT, () => {
console.log(`🌐 API ${PORT} portunda çalışıyor`);
});


// --- Discord Bot ---
const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
],
});


const prefix = process.env.PREFIX || "!";


client.once("ready", () => {
console.log(`✅ Bot giriş yaptı: ${client.user.tag}`);
});


client.on("messageCreate", (message) => {
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;


const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();


if (command === "ping") {
message.reply("🏓 Pong!");
}
});


client.login(process.env.DISCORD_TOKEN);
