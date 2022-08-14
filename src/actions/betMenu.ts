import {
  ActionRowBuilder,
  ButtonBuilder,
  Collector,
  ComponentType,
  DiscordAPIError,
  EmbedBuilder,
  Message,
  MessageCollector,
  MessagePayload,
  ModalBuilder,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import {
  getSelectOptionInteraction,
  listToSelectOptions,
  embedFighterChoice,
  embedFights,
  getButtonInteraction,
} from '@displayFormatting/index';
import { getUpcomingFights } from '@ufcApi/index';
import { client } from 'src/bot';
import { match } from 'assert';
import { logError, logServer } from '@utils/index';
import { MessageOptions } from 'child_process';

export let wagerModal = () => {
  // Create the modal
  const modal = new ModalBuilder().setCustomId('myModal').setTitle('My Modal');

// Create the text input components
const wagerInput = new TextInputBuilder()
  .setCustomId('wagerInput')
  .setLabel("How much would you like to wager?")
  .setStyle(TextInputStyle.Short);


// An action row only holds one text input,
// so you need one action row per text input.
const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(wagerInput);

// Add inputs to the modal
  modal.addComponents(firstActionRow);
  return modal;
}
  
export const matchSelectMenu = (ufcApiResponse) => {
  const matchupList: string[] = Object.keys(ufcApiResponse['fights']);
  const embedList: EmbedBuilder[] = embedFights(ufcApiResponse);
  let matchSelector = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId('select')
      .setPlaceholder('Nothing selected')
      .addOptions(listToSelectOptions(matchupList)),
  );

  return {
    content: '',
    embeds: embedList,
    components: [matchSelector],
    ephemeral: true,
  };

}

export const choiceMessage = (ufcApiResponse, selectedMatch) => {
  const { Red, Blue } = ufcApiResponse.fights[selectedMatch];
  const embed = embedFighterChoice(ufcApiResponse, selectedMatch);
  let fighterButtons = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder().setCustomId('Red').setStyle(4).setLabel(Red.Name),
          new ButtonBuilder().setCustomId('Blue').setStyle(1).setLabel(Blue.Name),
          new ButtonBuilder().setCustomId('Cancel').setStyle(2).setLabel('Cancel').setEmoji('🚫'),
  );
  return {
    content: '',
    embeds: [embed],
    components: [fighterButtons],
    ephemeral: true,
    fetchReply: true,
  }
};

export async function betMenu(msg, wager) {
  // Get Data from the API (send message while waiting)
  let tempMsg = await msg.reply({
    content: 'Retrieving data please wait...',
    ephemeral: true,
  });
  const response = await getUpcomingFights();
  if (!response) return;
  // await tempMsg.delete();

  // Turn data into a select box message with an embed of all matches
  const matchSelectionMsg = await msg.editReply(matchSelectMenu(response));

  // Get the match selection response
  const selectedInteraction = await getSelectOptionInteraction(
    matchSelectionMsg,
    msg.user.id
  );
  if (!selectedInteraction || selectedInteraction.values[0] === 'Cancel') {
    // await matchSelectionMsg.delete();
    return;
  }

  const selectedMatch = selectedInteraction.values[0];
  const choiceMsg = await selectedInteraction.update(choiceMessage(response, selectedMatch));
  const buttonInteraction = await getButtonInteraction(choiceMsg, msg.user.id);

  console.log(buttonInteraction.customId);
  if (!buttonInteraction || buttonInteraction.customId === 'Cancel') {
    await choiceMsg.delete();
    return;
  }

  console.log(`You have selected ${buttonInteraction.customId}`);
  msg.editReply({
    content: `You have selected ${buttonInteraction.customId}`,
    embeds: [],
    components: [],
  });
}
