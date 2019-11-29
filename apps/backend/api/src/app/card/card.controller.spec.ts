import App from './../app';
import CardController from './card.controller';
import * as request from 'supertest';
import { ICreditCard } from '@test-workspace/model';

const API_PATH: string = '/api/v1/card';

describe(' GET Cards Endpoint ', () => {
  it('should GET all existing cards', async () => {
    const cardController = new CardController();
    const app = new App([cardController]);
    const result = await request(app.getServer())
      .get(API_PATH)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        const cards: ICreditCard[] = res.body;
        cards[0].name === 'Satadru';
        cards[1].name === 'Bhattacharjee';
      });
  });

  it('should POST cards, return invalid luhn card error', async () => {
    const mockCard: ICreditCard = {
      name: 'API TEST',
      number: 1234567890,
      limit: 100,
      balance: 20
    };
    const cardController = new CardController();
    const app = new App([cardController]);
    const result = await request(app.getServer())
      .post(API_PATH)
      .send(mockCard)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(function(res) {
        const error = JSON.parse(res.error.text);
        error.message == 'Card number: Not luhn 10 card number';
      });
  });

  it('should POST cards, return success', async () => {
    const mockCard: ICreditCard = {
      name: 'API TEST',
      number: 9803407981,
      limit: 100,
      balance: 20
    };
    const cardController = new CardController();
    const app = new App([cardController]);
    const result = await request(app.getServer())
      .post(API_PATH)
      .send(mockCard)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {});
  });
});
