import {
  ChatInputCommandInteraction,
  ComponentType,
  MessagePayload,
} from 'discord.js';
import { getUpcomingFights } from '@ufcApi/index';
import {
  getButtonInteraction,
  getModalResponse,
  getSelectOptionInteraction,
} from '@displayFormatting/index';
import { choiceMessage, matchSelectMenu, wagerModal } from './betMenu';
import { Wager } from '@classes/index';
import { logError } from '@utils/log';

export async function startBetSaga(interaction) {
  //------------------------------------------------
  //              Wager Modal
  //------------------------------------------------
  const modal = wagerModal();
  await interaction.showModal(modal);
  const modalResponseInteraction: any = await getModalResponse(interaction);
  const wager = modalResponseInteraction.fields.getTextInputValue('wagerInput');
  const wagerClass: Wager = new Wager(wager);
  if (!(await wagerClass.validate())) {
    modalResponseInteraction.reply(wagerClass.generateErrorMessage());
    return;
  }

  //------------------------------------------------
  //              Temp Message - UFC Api
  //------------------------------------------------
  let tempMsg = await modalResponseInteraction.reply({
    content: 'Retrieving data please wait...',
    ephemeral: true,
  });
  const response = await getUpcomingFights();
  if (!response) {
    modalResponseInteraction.editReply('Error retrieving data, try again. This can be caused by the API being asleep.');
    logError('NO API RESPONSE, is server running?');
    return;
  }

  //------------------------------------------------
  //              Select Match Menu
  //------------------------------------------------
  const matchSelectionMsg = await modalResponseInteraction.editReply(
    matchSelectMenu(response),
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
    choiceMessage(response, selectedMatch),
  );
  const buttonInteraction = await getButtonInteraction(
    choiceMsg,
    modalResponseInteraction.user.id,
  );

  if (!buttonInteraction || buttonInteraction.customId === 'Cancel') {
    //TODO: Let user know they have cancelled
    return;
  }
  const chosenCorner = buttonInteraction.customId;

  //------------------------------------------------
  //              Respond to User
  //------------------------------------------------
  modalResponseInteraction.editReply({
    content: `You have selected ${buttonInteraction.customId}`,
    embeds: [],
    components: [],
  });
}
