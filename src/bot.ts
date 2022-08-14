
import { ChatInputCommandInteraction, Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { betMenu, startBetSaga } from './actions';
import { logServer } from './utils';
import { testingClientId, testingGuildId } from './utils/constants';
config();

// Command Code
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);


(async () => {
	const commands = [
		{
			name: 'bet',
			description: 'bet some of your mula on a UFC fight.',
		}
	]
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(testingClientId, testingGuildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const commandInteraction: ChatInputCommandInteraction = interaction;
	switch (commandInteraction.commandName) {
		case 'bet':
			await startBetSaga(commandInteraction);
			break;
	}
});
// client.on("messageCreate", async (message) => {
//     let msgContent = message.content;
//     if (message.content.startsWith(botSymbol)) {
//         msgContent = msgContent.substring(1).trim().toLowerCase();
//   }
//   logServer(`${message.author.username}: ${msgContent}`)

//   const guild = client.guilds.cache.get(testingGuildId);
//   let slashCommands;
//   slashCommands = guild ? guild.commands : client.application?.commands
//   slashCommands?.create(name: 'pog', description: 'gers');

//     const commandList = msgContent.split(' ');
//     const command = commandList[0];
//     switch (command) {
//       case "bet":
//             const wager = Number(commandList[1]);
//             await betMenu(message, wager);
//             break;
//         case "menu":
//             logServer('menu');
//             break;
//     }
    
//   });

client.on('ready', () => {
  logServer(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
