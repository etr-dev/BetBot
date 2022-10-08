import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  Emoji,
} from 'discord.js';
import { getUsersBets } from '@apis';
import { numberToEmoji, sleep, spliceIntoChunks } from '@utils/functions';
import {
  embedWaitMessage,
  embedPlacedBet,
  getButtonInteraction,
} from '@displayFormatting';
import {
  BetSelection,
  GetUsersBetsRequest,
} from 'src/apis/backendApi/requests';

async function viewBetHistory(interaction, choice: BetSelection) {
  const getUsersBetsRequest: GetUsersBetsRequest = {
    userId: interaction.user.id,
    betSelection: choice,
    attachMatchInfo: true,
  };
  const { data } = await getUsersBets(getUsersBetsRequest);
  let historyEmbeds: EmbedBuilder[] = [];
  let count = 0;
  for (const elem of data) {
    // if (count > 9) break; // TOOD: split this into pages
    const { match, bet } = elem;
    historyEmbeds.push(embedPlacedBet(match, bet));
    count++;
  }

  let historyIsActive = true;
  const pages = spliceIntoChunks(historyEmbeds, 5);
  let selectedPage = 0;
  while (historyIsActive) {
    const back = selectedPage - 1;
    const next = selectedPage + 1;
    const disableBack = back < 0;
    const disableNext = next == pages.length;

    let pageButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`${back}`)
        .setStyle(2)
        .setEmoji('⬅️')
        .setDisabled(disableBack),
      new ButtonBuilder()
        .setCustomId(`${next}`)
        .setStyle(2)
        .setEmoji('➡️')
        .setDisabled(disableNext),
      new ButtonBuilder()
        .setCustomId('Cancel')
        .setStyle(2)
        .setLabel('Cancel')
        .setEmoji('🚫'),
      new ButtonBuilder()
        .setCustomId(`Page`)
        .setStyle(2)
        .setEmoji(selectedPage < 9 ? numberToEmoji(selectedPage + 1) : '☢️')
        .setDisabled(true),
    );

    const pageSelectorMsg = await interaction.editReply({
      content: `Page ${numberToEmoji(selectedPage + 1)}:`,
      embeds: pages[selectedPage],
      components: [pageButtons],
      ephemeral: true,
      fetchReply: true,
    });

    const res = await getButtonInteraction(
      pageSelectorMsg,
      interaction.user.id,
      20000,
    );

    if (!res) {
      const disabledButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`${back}`)
          .setStyle(2)
          .setEmoji('⬅️')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`${next}`)
          .setStyle(2)
          .setEmoji('➡️')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('Cancel')
          .setStyle(2)
          .setLabel('Timed out')
          .setEmoji('⏱️')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`Page`)
          .setStyle(2)
          .setEmoji(numberToEmoji(selectedPage + 1))
          .setDisabled(true),
      );

      interaction.editReply({
        content: 'Response Timed out do /history again to select a new page.',
        components: [disabledButtons],
        ephemeral: true,
      });
      return;
    } else if (res.customId == 'Cancel') {
      interaction.editReply({
        content: 'Cancelled',
        embeds: [],
        components: [],
        ephemeral: true,
      });
      return;
    }

    selectedPage = Number(res.customId);
  }
}

export async function startHistorySaga(interaction) {
  //------------------------------------------------
  //              Temp Message - UFC Api
  //------------------------------------------------
  let tempMsg = await interaction.reply({
    content: '',
    embeds: [embedWaitMessage()],
    ephemeral: true,
  });

  let historyButtons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(BetSelection.ALL)
      .setStyle(2)
      .setEmoji('⬅️')
      .setLabel('ALL'),
    new ButtonBuilder()
      .setCustomId(BetSelection.INACTIVE)
      .setStyle(2)
      .setEmoji('⬅️')
      .setLabel('INACTIVE'),
    new ButtonBuilder()
      .setCustomId(BetSelection.ACTIVE)
      .setStyle(2)
      .setEmoji('⬅️')
      .setLabel('ACTIVE'),
    new ButtonBuilder()
      .setCustomId('Cancel')
      .setStyle(2)
      .setLabel('Cancel')
      .setEmoji('🚫'),
  );

  const historySelectionMsg = await interaction.editReply({
    content: 'Pick your poison.',
    embeds: [],
    components: [historyButtons],
    ephemeral: true,
    fetchReply: true
  });
  
  const res = await getButtonInteraction(
    historySelectionMsg,
    interaction.user.id,
    20000,
  );

  if (!res || res.customId == 'Cancel') {
    return;
  }

  await viewBetHistory(interaction, res.customId);
}
