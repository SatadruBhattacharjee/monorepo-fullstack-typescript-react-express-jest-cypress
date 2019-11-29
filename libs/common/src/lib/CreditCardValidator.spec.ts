import { CreditCardValidator } from './CreditCardValidator';
import { ICreditCard, ICreditCardValidation } from '@test-workspace/model';

describe(' Credit Card Validations', () => {
  const validLuhnCard: number = 6885622859;
  const instance: CreditCardValidator = new CreditCardValidator();

  it('Card Name should not be empty', () => {
    expect(instance.validateCardName('').valid).toBeFalsy();
  });

  it('Card Name should be more than 2 char long', () => {
    expect(instance.validateCardName('test').valid).toBeTruthy();
  });

  it('Card Number should be 10 digit ', () => {
    expect(instance.validateCardNumber(1234567).valid).toBeFalsy();
  });

  it('Card Number Should be a valid Luhn10 no ', () => {
    expect(instance.validateCardNumber(validLuhnCard).valid).toBeTruthy();
  });

  it('Card Number Should be a valid Luhn10 no, with false input ', () => {
    expect(instance.validateCardNumber(1234567890).valid).toBeFalsy();
  });

  it('Card Limit should be 0 min ', () => {
    expect(instance.validateCardLimit(-1).valid).toBeFalsy();
  });
});
