import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import { ICreditCard, ICreditCardValidation } from '@test-workspace/model';
import { CreditCardValidator } from '@test-workspace/common';

function cardValidationMiddleware<T>(): express.RequestHandler {
  return (req, res, next) => {
    const { name, number, limit, balance } = req.body;
    const creditCard: ICreditCard = {
      name,
      number: parseInt(number),
      limit: parseInt(limit),
      balance: parseInt(balance)
    };
    const validator: CreditCardValidator = new CreditCardValidator(creditCard);
    const nameValidator: ICreditCardValidation = validator.validateCardName(
      creditCard.name
    );
    const limitValidator: ICreditCardValidation = validator.validateCardLimit(
      creditCard.limit
    );
    const cardNumberValidator: ICreditCardValidation = validator.validateCardNumber(
      creditCard.number
    );

    if (!nameValidator.valid)
      next(new HttpException(400, `Card name: ${nameValidator.reason}`));
    else if (!limitValidator.valid)
      next(new HttpException(400, `Card limit: ${limitValidator.reason}`));
    else if (!cardNumberValidator.valid)
      next(
        new HttpException(400, `Card number: ${cardNumberValidator.reason}`)
      );

    next();
  };
}

export default cardValidationMiddleware;
