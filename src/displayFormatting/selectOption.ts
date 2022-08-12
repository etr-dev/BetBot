import { ComponentType, Message, SelectMenuComponentOptionData, User } from 'discord.js';
import { selectResponseTime } from '../utils/constants';
import { logServer } from '../utils';

export async function listToSelectOptions(inputList, includeCancel = false) {
  let selectList: SelectMenuComponentOptionData[] = [];
  let count = 1;
  for (let item of inputList) {
    let selectOption: SelectMenuComponentOptionData = {
      label: `${count}. ${item}`,
      value: item,
    };
    selectList.push(selectOption);
    count++;
  }

  if (includeCancel) {
    let selectOption: SelectMenuComponentOptionData = {
      label: 'Cancel',
      value: 'Cancel',
      emoji: '🚫',
    };
    selectList.push(selectOption);
  }
  return selectList;
}

export async function getSelectOptionInteraction(selectMsg: Message, orginalUser: User) {
  let response = undefined;

  const filter = (i) => {
    return i.user.id === orginalUser.id;
  };

  return selectMsg
    .awaitMessageComponent({
      filter,
      componentType: ComponentType.SelectMenu,
      time: selectResponseTime,
    })
    .then((interaction) => {
        return interaction;
    })
    .catch((err) => {
      return undefined;
    });
}
