import { ICreditCard, ICreditCardValidation } from '@test-workspace/model';

const isLuhn10 = (num: string): boolean => {
  const len: number = num.length;
  const parity: number = len % 2;
  let sum: number = 0;
  for (let i = len - 1; i >= 0; i--) {
    let d: number = parseInt(num.charAt(i));
    if (i % 2 == parity) {
      d *= 2;
    }
    if (d > 9) {
      d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
};

const validationError = (reason: string): ICreditCardValidation => ({
  valid: false,
  reason: reason
});

const validationSuccess = (): ICreditCardValidation => ({
  valid: true
});

export class CreditCardValidator {
  constructor(public card?: ICreditCard) {}

  validateCardNumber(cardNumber: number): ICreditCardValidation {
    if (!cardNumber) return validationError('Card number can not be empty');

    const num = cardNumber || this.card || this.card.number || NaN;
    if (typeof num !== 'number') return validationError('Not a number');
    if (num.toString().length === 0) return validationError('Too short');
    if (num.toString().length !== 10)
      return validationError('Not a 10 Digit Card Number');
    if (!isLuhn10('' + num)) return validationError('Not luhn 10 card number');

    return validationSuccess();
  }

  validateCardLimit(cardLimit: number = 0): ICreditCardValidation {
    const limit = cardLimit || NaN;
    if (!limit) return validationError('Please enter a valid number');
    if (limit < 0) return validationError('Minimum Limit is 0');
    return validationSuccess();
  }

  validateCardName(cardName: string): ICreditCardValidation {
    if (!cardName) return validationError('Card name can not be empty');
    const name = cardName || this.card || this.card.name || '';
    if (typeof name !== 'string') return validationError('Not a string');
    if (name.length < 2) return validationError('Not a valid name');
    return validationSuccess();
  }
}
