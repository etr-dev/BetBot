import { ComponentType } from "discord.js";
import { logError } from "../utils";
import { selectResponseTime } from "../utils/constants";

export async function getButtonInteraction(messageWithButtons, orginalUserId, timeout: number = 10000 ) {
  const filter = i => {
    i.deferUpdate();
    return i.user.id === orginalUserId;
  };
  
  return messageWithButtons.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: timeout })
    .then(interaction => { return interaction })
    .catch(err => { logError(err); return undefined; });
  }