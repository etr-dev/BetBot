import {
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
} from 'discord.js';
import { config } from 'dotenv';
import { checkMatches, startBetSaga, startHistorySaga } from '@actions';
import { healthCheck } from './apis/healthCheck.api';
import { logError, logServer, logWarning } from './utils';
import { testingClientId, testingGuildId } from './utils/constants';
import { sleep } from '@utils/functions';
config();

// Command Code
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const discordToken = process.env.DISCORD_TOKEN_TESTBOT;
const rest = new REST({ version: '10' }).setToken(discordToken);

(async () => {
  const commands = [
    {
      name: 'bet',
      description: 'bet some of your mula on a UFC fight.',
    },
    {
      name: 'history',
      description: 'View your previous bets active and inactive.',
    },
  ];
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
    case 'history':
      await startHistorySaga(commandInteraction);
      break;
  }
});

client.on('ready', async () => {
  let health = false;
  while (!health) {
    health = await healthCheck();
    if (!health) {
      await sleep(1000 * 20);
    }
  }
  await checkMatches();
  let interval = setInterval(checkMatches, 1000 * 60 * 1); // 1000 * 60 seconds * 15 minutes
  logServer(`Logged in as ${client.user.tag}`);
});

client.login(discordToken);
