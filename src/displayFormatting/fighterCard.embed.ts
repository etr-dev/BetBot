import { EmbedBuilder } from 'discord.js';
import { CreateMatchRequest } from 'src/apis/backendApi/requests/createMatch.request';
import { PlaceBetRequest } from 'src/apis/backendApi/requests/placeBet.request';

export function embedSelectedFighter(createdMatch: CreateMatchRequest, placedBet: PlaceBetRequest) {
    const embed = new EmbedBuilder()
        .setTitle(createdMatch.matchTitle)
        .setDescription(`${createdMatch[placedBet.selectedCorner].name} | ${createdMatch.eventTitle}`)
        .setThumbnail(createdMatch[placedBet.selectedCorner].image)
        .setTimestamp(Date.now());

  embed.addFields({
    name: `Wager`,
    value: `$${placedBet.wagerAmount}`,
    inline: true,
  });

  embed.addFields({
    name: `Odds`,
    value: `${placedBet.wagerOdds}`,
    inline: true,
  });

  embed.addFields({
    name: `Payout`,
    value: `$${placedBet.amountToPayout}`,
    inline: true,
  });

  return embed;
}
