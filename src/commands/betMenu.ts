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
  SelectMenuBuilder,
} from 'discord.js';
import {
  getSelectOptionInteraction,
  listToSelectOptions,
} from '../displayFormatting/selectOption';
import {
  embedFighterChoice,
  embedFights,
} from '../displayFormatting/embedfights';
import { getUpcomingFights } from '../ufcApi';
import { client } from 'src/bot';
import { match } from 'assert';
import { logError, logServer } from 'src/utils';
import { getButtonInteraction } from '../displayFormatting/buttonHelpers';

async function createMatchSelectionMessage(msg, response) {
  const matchupList: string[] = Object.keys(response['fights']);
  const embedList: EmbedBuilder[] = await embedFights(response);
  let matchSelector = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId('select')
      .setPlaceholder('Nothing selected')
      .addOptions(await listToSelectOptions(matchupList)),
  );

  let matchSelectionMsg = await msg.reply({
    embeds: embedList,
    components: [matchSelector],
    ephemeral: true,
  });

  return matchSelectionMsg;
}

export async function createChoiceMessage(msg, response, selectedMatch) {
  const { Red, Blue } = response.fights[selectedMatch];
  const embed = await embedFighterChoice(response, selectedMatch);
  let fighterButtons = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder().setCustomId('Red').setStyle(4).setLabel(Red.Name),
          new ButtonBuilder().setCustomId('Blue').setStyle(1).setLabel(Blue.Name),
          new ButtonBuilder().setCustomId('Cancel').setStyle(2).setLabel('Cancel').setEmoji('🚫'),
  );
  
  let fighterChoiceMessage = await msg.reply({
    embeds: [embed],
    components: [fighterButtons],
    ephemeral: true,
    fetchReply: true,
  });

  return fighterChoiceMessage;
}

export async function betMenu(msg, wager) {
  // Get Data from the API (send message while waiting)
  let tempMsg = await msg.reply({
    content: 'Retrieving data please wait...',
    ephemeral: true,
  });
  const response = await getUpcomingFights();
  if (!response) return;
  await tempMsg.delete();

  // Turn data into a select box message with an embed of all matches
  let matchSelectionMsg = await createMatchSelectionMessage(msg, response);

  // Get the match selection response
  const selectedInteraction = await getSelectOptionInteraction(
    matchSelectionMsg,
    msg.author,
  );
  if (!selectedInteraction || selectedInteraction.values[0] === 'Cancel') {
    await matchSelectionMsg.delete();
    return;
  }

  const selectedMatch = selectedInteraction.values[0];
  let choiceMsg = await createChoiceMessage(
    selectedInteraction,
    response,
    selectedMatch,
  );

  const buttonInteraction = await getButtonInteraction(choiceMsg, msg.author);
  console.log(buttonInteraction.customId);
  if (!buttonInteraction || buttonInteraction.customId === 'Cancel') {
    await choiceMsg.delete();
    return;
  }

  console.log(`You have selected ${buttonInteraction.customId}`);
}
