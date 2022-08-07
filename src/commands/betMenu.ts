
async function initBetMenu(msg) {
    let tempMsg = await msg.reply('Retrieving data please wait...');
    //const response = await getUpcomingFights()
    await new Promise(r => setTimeout(r, 2000));
    await tempMsg.delete()

    // embedList = embedAllFights(response)
    // selOptions = listToSelectOptions(getFightTitleList(response))
    // selOptions.append(SelectOption(label='🚫 Cancel', value='Cancel'))
    // msg = await ctx.send(
    //     embeds=embedList,
    //     components=[
    //         Select(
    //             placeholder="Select something!",
    //             options= selOptions,
    //             custom_id="betMenu",
    //         )

    //     ],
    // )
    // return [response,msg]
}

export async function betMenu(msg, wager) {
    initBetMenu(msg);
}