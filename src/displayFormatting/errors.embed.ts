import { ValidationError } from 'class-validator';
import { Colors, Embed, EmbedBuilder, EmbedData } from 'discord.js';

export function embedErrors(error: ValidationError) {
  const embed = new EmbedBuilder().setTitle('Validation Checks Failed.');

    const constraints = Object.keys(error.constraints);
    for (let constraint of constraints) {
        embed.addFields({
            name: `__${constraint}__`,
            value: error.constraints[constraint],
            inline: false,
          });
    }

  return embed;
}
