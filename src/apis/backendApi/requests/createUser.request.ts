export class CreateUserRequest {
    constructor(interaction) {
      this.userId = interaction.user.id;
      this.discordGuildId = interaction.guild.id;
      this.name = interaction.user.username;
    }
  
    userId: string;
    discordGuildId: string;
    name: string;
  }