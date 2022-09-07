import {
  ChatInputCommandInteraction,
  ComponentType,
  EmbedBuilder,
  MessagePayload,
} from 'discord.js';
import { choiceMessage, matchSelectMenu, wagerModal } from './betMenu';
import { logError } from '@utils/log';
import {
  getEventByUrl,
  getUpcomingFights,
  createMatch,
  getUserWalletId,
  getWallet,
  placeBet,
  getUsersBets,
} from '@apis';
import { match } from 'assert';
import { Wager } from '@classes';
import { UfcEventResponse } from 'src/apis/ufcApi/responses/ufcEvent.response';
import { CreateUserRequest } from 'src/apis/backendApi/requests/createUser.request';
import { PlaceBetRequest } from 'src/apis/backendApi/requests/placeBet.request';
import { CreateMatchRequest } from 'src/apis/backendApi/requests/createMatch.request';
import { sleep } from '@utils/functions';
import {
  getButtonInteraction,
  getModalResponse,
  getSelectOptionInteraction,
  embedSelectedFighter,
  embedValidationMessage,
  embedWaitMessage,
  embedPlacedBet,
} from '@displayFormatting';
import {
  BetSelection,
  GetUsersBetsRequest,
} from 'src/apis/backendApi/requests';

export async function startHistorySaga(interaction) {
  //------------------------------------------------
  //              Temp Message - UFC Api
  //------------------------------------------------
  let tempMsg = await interaction.reply({
    content: '',
    embeds: [embedWaitMessage()],
    ephemeral: true,
  });

  const getUsersBetsRequest: GetUsersBetsRequest = {
    userId: interaction.user.id,
    betSelection: BetSelection.ALL,
    attachMatchInfo: true,
  };
  console.log(await getUsersBets(getUsersBetsRequest));
  const { data } = await getUsersBets(getUsersBetsRequest);
  let historyEmbeds: EmbedBuilder[] = [];
  let count = 0;
  for (const elem of data) {
    if (count > 9) break; // TOOD: split this into pages
    const { match, bet } = elem;
    historyEmbeds.push(embedPlacedBet(match, bet));
    count++;
  }

  console.log(historyEmbeds);
  interaction.editReply({
    content: 'hit',
    embeds: historyEmbeds,
    ephemeral: true,
  });
}
