import { SelectMenuComponentOptionData } from "discord.js"

export async function listToSelectOptions(inputList) {
    let selectList: SelectMenuComponentOptionData[] = []
    let count = 1
    for (let item of inputList) {
        let selectOption: SelectMenuComponentOptionData = {
            label: `${count}. ${item}`,
            value: item,
        }
        selectList.push(selectOption);
        count++
    }

    return selectList;
}