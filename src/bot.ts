
import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { betMenu } from './commands';
import { logServer } from './utils';
export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const botSymbol = '-';
config();


client.on("messageCreate", async (message) => {
    logServer('here');
    let msgContent = message.content;
    if (message.content.startsWith(botSymbol)) {
        msgContent = msgContent.substring(1).trim().toLowerCase();
    }
    
    const commandList = msgContent.split(' ');
    const command = commandList[0];
    switch (command) {
        case "bet":
            const wager = Number(commandList[1]);
            await betMenu(message, wager);
            break;
        case "menu":
            logServer('menu');
            break;
    }
    
  });

client.on('ready', () => {
  logServer(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
