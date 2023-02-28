/// <reference types="cypress" />

const randomNameCustomer = (Math.random() + 1).toString(36).substring(7);

describe('Create Customer', () => {
  it('passes', () => {
    cy.login();
    cy.url().should('include', '/dashboard')

    cy.get('#menu-link').invoke('show').click();
    cy.contains('Kunden').click();
    cy.url().should('include', '/clients');

    cy.get('#new-customer-button').click();
    cy.wait(1000);
    cy.get('#name-input').type(randomNameCustomer);
    cy.get('#address-input').type('Musterstr. 1, 82280 Musterdorf');
    cy.get('#phone-input').type('123456789');
    cy.get('#email-input').type('musteremail@mustermann.de');
    cy.get('#submit-button').click();

    cy.contains(randomNameCustomer);


    cy.wait(6000);
    cy.logout();
  });
});