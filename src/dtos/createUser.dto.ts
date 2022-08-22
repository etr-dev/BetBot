import { IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(interaction) {
    this.userId = interaction.user.id;
    this.discordGuildId = interaction.guild.id;
    this.name = interaction.user.username;
  }

  @IsNumberString()
  userId: string;

  @IsNumberString()
  discordGuildId: string;

  @IsString()
  name: string;
}
