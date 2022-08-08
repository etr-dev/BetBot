import { ActionRowBuilder, EmbedBuilder, Message, SelectMenuBuilder } from "discord.js";
import { listToSelectOptions } from "../displayFormatting/selectOption";
import { embedFights } from "../displayFormatting/embedfights";
import { getUpcomingFights } from "../ufcApi";
import { client } from "src/bot";

async function initBetMenu(msg, response) {
    let tempMsg = await msg.reply('Retrieving data please wait...');
    const matchupList: string[] = Object.keys(response['fights']);
    await tempMsg.delete();
    const embedList: EmbedBuilder[] = await embedFights(response);
    let matchSelector = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions(
						await listToSelectOptions(matchupList)
					),
			);


    let matchSelectionMsg = await msg.reply({
        embeds: embedList,
        components: [matchSelector]
    });

    return matchSelectionMsg;
}

export async function betMenu(msg, wager) {
    const response = await getUpcomingFights();
    let matchSelectionMsg: Message<boolean> = await initBetMenu(msg, response);
}