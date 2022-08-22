import { ModalSubmitInteraction } from 'discord.js';
import { logError } from '../utils';
import { selectResponseTime } from '../utils/constants';

export async function getModalResponse(modalInteraction): Promise<ModalSubmitInteraction> {
  const filter = (i) => {
    return i.user.id === modalInteraction.user.id;
  };

  return modalInteraction
    .awaitModalSubmit({ filter, time: selectResponseTime })
      .then((interaction) => {
      return interaction;
    })
    .catch((err) => {
      // logError(err);
      return null;
    });
}
