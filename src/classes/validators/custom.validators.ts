import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: 'isLessThanWalletAmount', async: false })
export class IsLessThanWalletAmount implements ValidatorConstraintInterface {
  validate(amount: number, args: ValidationArguments) {
    console.log(args);
    // @ts-ignore
    return amount <= args.object.walletAmount;
  }

  defaultMessage(args: ValidationArguments) {
    // @ts-ignore
    return `Wager exceeds your wallet amount: $${args.object.walletAmount}`;
  }
}
