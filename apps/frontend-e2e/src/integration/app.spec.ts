import { getCardNumberError, getCardCreateStatus } from '../support/app.po';

const cardValid = {
  name: 'Valid Card',
  number: '6885622859',
  limit: '199'
};

const cardInvalid = {
  name: 'Invalid Card',
  number: '1234567890',
  limit: '399'
};

describe('frontend', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add the credit card', () => {
    // Custom command example, see `../support/commands.ts` file

    cy.get('input[name="name"]')
      .type(cardValid.name)
      .should('have.value', cardValid.name);

    cy.get('input[name="number"]')
      .type(cardValid.number)
      .should('have.value', cardValid.number);

    cy.get('input[name="limit"]')
      .type(cardValid.limit)
      .should('have.value', cardValid.limit);

    cy.wait(1000).then(() => {
      cy.get('button').click();
      cy.wait(3000).then(() => {
        getCardCreateStatus().contains('The Card is added successfully');
      });
    });

    // Function helper example, see `../support/app.po.ts` file
    //getGreeting().contains('Welcome to frontend!');
  });

  it('should see the card validation error', () => {
    // Custom command example, see `../support/commands.ts` file

    cy.get('input[name="name"]')
      .type(cardInvalid.name)
      .should('have.value', cardInvalid.name);

    cy.get('input[name="number"]')
      .type(cardInvalid.number)
      .should('have.value', cardInvalid.number);

    cy.get('input[name="limit"]')
      .type(cardInvalid.limit)
      .should('have.value', cardInvalid.limit);

    cy.wait(1000).then(() => {
      getCardNumberError().contains('luhn');
    });

    // Function helper example, see `../support/app.po.ts` file
    //getGreeting().contains('Welcome to frontend!');
  });
});
