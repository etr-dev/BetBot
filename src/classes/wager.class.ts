import { embedErrors } from '@displayFormatting/errors.embed';
import {
  Contains,
  contains,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  Validate,
  validate,
  ValidationArguments,
  ValidationError,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsLessThanWalletAmount } from './validators/custom.validators';


export class Wager {
  public isValid: boolean;
  private errors: ValidationError[] = [];
  private walletAmount: number = 0;

  //TODO: Add a user to this class so we can check their wallet in DB
  constructor(strWager: string, userWalletAmount: number) {
    this.amount = Number(strWager);
    this.walletAmount = userWalletAmount;
  }

  async validate(): Promise<Boolean> {
    await validate(this, { skipMissingProperties: true }).then((errors) => {
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

  calculateWagerDetails(odds: string) {
    this.wagerOdds = odds;
    const oddsNumber = Number(odds);

    this.amountToWin =
      oddsNumber > 0
        ? (this.amount / 100) * oddsNumber
        : -(this.amount / oddsNumber) * 100;

    this.amountToPayout = this.amountToWin + this.amount;

    this.amountToWin = Number(this.amountToWin.toFixed(2));
    this.amountToPayout = Number(this.amountToPayout.toFixed(2));
  }

  @IsNumber({ maxDecimalPlaces: 2 })
  @Validate(IsLessThanWalletAmount)
  @Min(0)
  @IsPositive()
  amount: number;

  @IsString()
  wagerOdds: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  amountToWin: number;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  amountToPayout: number;
}
