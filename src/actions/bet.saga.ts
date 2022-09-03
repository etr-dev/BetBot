import {
  ChatInputCommandInteraction,
  ComponentType,
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
} from '@displayFormatting';

export async function startBetSaga(interaction) {
  //------------------------------------------------
  //              Wager Modal
  //------------------------------------------------
  const createUserRequest = new CreateUserRequest(interaction);
  const walletRes = await getUserWalletId(createUserRequest);
  if (!walletRes) {
    interaction.reply('Error finding your wallet.');
  }
  const walletId = walletRes.walletId;
  const usersWallet = await getWallet(walletId);

  //------------------------------------------------
  //              Wager Modal
  //------------------------------------------------
  const modal = wagerModal();
  await interaction.showModal(modal);
  const modalResponseInteraction: any = await getModalResponse(interaction);
  if (!modalResponseInteraction) {
    // interaction.followUp({ content: 'Modal timed out!', ephemeral: true });
    return;
  }
  const wager = modalResponseInteraction.fields.getTextInputValue('wagerInput');
  const wagerClass: Wager = new Wager(wager, usersWallet.amount);
  if (!(await wagerClass.validate())) {
    modalResponseInteraction.reply(wagerClass.generateErrorMessage());
    return;
  }

  //------------------------------------------------
  //              Temp Message - UFC Api
  //------------------------------------------------
  let tempMsg = await modalResponseInteraction.reply({
    content: '',
    embeds: [embedWaitMessage()],
    ephemeral: true,
  });
  const ufcEventResponse = await getUpcomingFights();
  if (!ufcEventResponse) {
    modalResponseInteraction.editReply(
      'Error retrieving data, try again. This can be caused by the API being asleep.',
    );
    logError('NO API RESPONSE, is server running?');
    return;
  }

  //------------------------------------------------
  //              Select Match Menu
  //------------------------------------------------
  const matchSelectionMsg = await modalResponseInteraction.editReply(
    matchSelectMenu(ufcEventResponse),
  );

  // Get the match selection response
  const selectedInteraction = await getSelectOptionInteraction(
    matchSelectionMsg,
    modalResponseInteraction.user.id,
  );
  if (!selectedInteraction || selectedInteraction.values[0] === 'Cancel') {
    //TODO: Let user know they have cancelled
    return;
  }

  const selectedMatch = selectedInteraction.values[0];

  //------------------------------------------------
  //              Choose Fighter Buttons
  //------------------------------------------------
  const choiceMsg = await selectedInteraction.update(
    choiceMessage(ufcEventResponse, selectedMatch),
  );
  const buttonInteraction = await getButtonInteraction(
    choiceMsg,
    modalResponseInteraction.user.id,
  );

  if (!buttonInteraction || buttonInteraction.customId === 'Cancel') {
    //TODO: Let user know they have cancelled
    return;
  }
  const selectedCorner = buttonInteraction.customId;

  //------------------------------------------------
  //              Validate Wager, Fight, etc.
  //------------------------------------------------
  let placingBetMessage = await modalResponseInteraction.editReply({
    content: '',
    embeds: [embedValidationMessage()],
    components: [],
    ephemeral: true,
  });
  const validateUfcBetApiResponse: UfcEventResponse = await getEventByUrl(
    ufcEventResponse.url,
  );
  if (!validateUfcBetApiResponse) {
    modalResponseInteraction.editReply(
      'Error validating UFC Event, try again.',
    );
    logError('NO VALIDATION API RESPONSE, is server running?');
    return;
  }

  if (validateUfcBetApiResponse.fights[selectedMatch].details.isLive) {
    modalResponseInteraction.editReply('The match is already live.');
  }

  if (validateUfcBetApiResponse.fights[selectedMatch].details.isComplete) {
    modalResponseInteraction.editReply('The match is already over.');
  }

  //------------------------------------------------
  //              Store In Database
  //------------------------------------------------
  const createMatchRequest = new CreateMatchRequest(
    ufcEventResponse,
    selectedMatch,
  );
  const matchRes = await createMatch(createMatchRequest);
  if (!matchRes) {
    modalResponseInteraction.editReply(
      'The match failed to post, report this error.',
    );
    return;
  }
  const { matchId } = matchRes;

  wagerClass.calculateWagerDetails(
    validateUfcBetApiResponse.fights[selectedMatch][selectedCorner].odds,
  );

  //Place bet
  const placeBetRequest: PlaceBetRequest = {
    matchId,
    userId: interaction.user.id,
    walletId,
    selectedCorner,
    wagerOdds: wagerClass.wagerOdds,
    wagerAmount: wagerClass.amount,
    amountToWin: wagerClass.amountToWin,
    amountToPayout: wagerClass.amountToPayout,
  };
  const betRes = await placeBet(placeBetRequest);
  if (!betRes) {
    modalResponseInteraction.editReply('The bet failed to place. Try again.');
    return;
  }

  //------------------------------------------------
  //              Respond to User
  //------------------------------------------------
  modalResponseInteraction.editReply({
    content: 'Bet Placed!',
    embeds: [embedSelectedFighter(createMatchRequest, placeBetRequest)],
    components: [],
  });
}
