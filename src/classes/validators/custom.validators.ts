import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidatorOptions, registerDecorator } from "class-validator";

@ValidatorConstraint({ name: 'isLessThanWalletAmount', async: false })
class IsLessThanWalletAmountRule implements ValidatorConstraintInterface {
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

export function IsLessThanWalletAmount(validatorOptions?: ValidatorOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsLessThanWalletAmount',
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      validator: IsLessThanWalletAmountRule,
    })
  }
}
