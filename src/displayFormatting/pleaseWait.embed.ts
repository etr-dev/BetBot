import { betbotLogo } from '@utils/constants';
import { EmbedBuilder } from 'discord.js';
import { CreateMatchRequest } from 'src/apis/backendApi/requests/createMatch.request';
import { PlaceBetRequest } from 'src/apis/backendApi/requests/placeBet.request';

export function embedValidationMessage() {
    const embed = new EmbedBuilder()
        .setTitle('🔎 Validating')
        .setDescription('Placing bet and validating wager please wait...')
        .setFooter({text: 'betbot', iconURL: betbotLogo});

  return embed;
}

export function embedWaitMessage() {
  const embed = new EmbedBuilder()
      .setTitle('💬 Retrieving Data')
      .setDescription('Getting UFC data this could take a few seconds, please wait...')
      .setFooter({text: 'betbot', iconURL: betbotLogo});

return embed;
}