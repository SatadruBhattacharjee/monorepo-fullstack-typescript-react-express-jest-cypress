import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import Controller from '../interfaces/controller.interface';
import cardValidationMiddleware from '../middleware/cardValidation.middleware';
import { ICreditCard } from '@test-workspace/model';

const creditCards: ICreditCard[] = [
  {
    name: 'Satadru',
    number: 6885622859,
    limit: 100,
    balance: 50
  },
  {
    name: 'Bhattacharjee',
    number: 1344361157,
    limit: 200,
    balance: 80
  }
];

class CardController implements Controller {
  public path = '/api/v1/card';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private isDuplicateCardNumber = (
    cards: ICreditCard[],
    cardNumber: number
  ): boolean => {
    return cards.some((card: ICreditCard) => card.number === cardNumber);
  };

  private initializeRoutes() {
    this.router.get(this.path, this.getAllCards);
    this.router.post(this.path, cardValidationMiddleware(), this.createCard);
  }

  private getAllCards = (
    request: express.Request,
    response: express.Response
  ) => {
    response.send(creditCards);
  };

  private createCard = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const cardData: ICreditCard = request.body;
    if (this.isDuplicateCardNumber(creditCards, cardData.number)) {
      next(new HttpException(400, `Duplicate Credit Card Number`));
    } else {
      creditCards.push(cardData);
      response.send(cardData);
    }
  };
}

export default CardController;
