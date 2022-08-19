import { embedErrors } from '@displayFormatting/errors.embed';
import { IsInt, Min, validate, ValidationError } from 'class-validator';

export default class Wager {
  public isValid: boolean;
  private errors: ValidationError[] = [];
  async validate(): Promise<Boolean> {
    await validate(this).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        this.isValid = false;
        this.errors = errors;
      } else {
        this.isValid = true;
      }
    });

    return this.isValid;
  }

  generateErrorMessage() {
    return {
      content: 'Your wager is invalid!',
      embeds: [embedErrors(this.errors[0])],
      ephemeral: true,
    };
  }

  //TODO: Add a user to this class so we can check their wallet in DB
  constructor(strWager: string) {
    this.amount = Number(strWager);
  }

  @IsInt()
  @Min(0)
  //TODO: Add a Max() check that is the clients wallet amount
  amount: number;
}
