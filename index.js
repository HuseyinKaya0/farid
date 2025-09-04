
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

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
