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

    cy.visit('http://localhost:3000/clients');

    cy.contains(randomNameCustomer);


    cy.get('#menu-link').invoke('show').click();
    cy.contains('Dashboard').click();
    cy.url().should('include', '/dashboard');

    cy.logout();
  });
});

describe('Edit Customer', () => {
  it('passes', () => {
    cy.login();
    cy.url().should('include', '/dashboard')

    cy.get('#menu-link').invoke('show').click();
    cy.contains('Kunden').click();
    cy.url().should('include', '/clients');


    cy.contains(randomNameCustomer);
    cy.xpath(`//table//tbody//tr//td[normalize-space(text())='${randomNameCustomer}']/parent::tr/td[6]/span`).click();
    cy.xpath(`//div[@tabindex='-1']//input[@id='address-input']`).clear().type('Musterstr. 1, 82280 Musterdorf' + randomNameCustomer);
    cy.xpath(`//div[@tabindex='-1']//button[@id='submit-button']`).click();

    cy.visit('http://localhost:3000/clients');

    cy.contains('Musterstr. 1, 82280 Musterdorf' + randomNameCustomer);

  });
});

describe('Delete Customer', () => {
  it('passes', () => {
    cy.login();
    cy.url().should('include', '/dashboard')

    cy.get('#menu-link').invoke('show').click();
    cy.contains('Kunden').click();
    cy.url().should('include', '/clients');

    cy.xpath(`//table//tbody//tr//td[normalize-space(text())='${randomNameCustomer}']/parent::tr/td[7]/span`).click();

    cy.visit('http://localhost:3000/clients');

    cy.contains(randomNameCustomer).should('not.exist');;

  });
});