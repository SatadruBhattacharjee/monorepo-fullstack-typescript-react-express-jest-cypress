/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import App from './app/app';
import CardController from './app/card/card.controller';

const app = new App([new CardController()]);

app.listen();
