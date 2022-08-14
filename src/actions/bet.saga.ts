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

export async function startBetSaga(interaction) {
  //------------------------------------------------
  //              Wager Modal
  //------------------------------------------------
  const modal = wagerModal();
  await interaction.showModal(modal);
  const modalResponseInteraction: any = await getModalResponse(interaction);
  const wager = modalResponseInteraction.fields.getTextInputValue('wagerInput');
  const testWagerClass: Wager = new Wager(wager);
  if (!(await testWagerClass.validate())) {
    modalResponseInteraction.reply(testWagerClass.generateErrorMessage());
    return;
  }

  //betMenu(modalResponseInteraction, wager);

  //------------------------------------------------
  //              Temp Message - UFC Api
  //------------------------------------------------
  let tempMsg = await modalResponseInteraction.reply({
    content: 'Retrieving data please wait...',
    ephemeral: true,
  });
  const response = await getUpcomingFights();
  if (!response) return;

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

  console.log(buttonInteraction.customId);
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
