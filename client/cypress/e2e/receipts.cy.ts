/// <reference types="cypress" />

const randomReceiptName = (Math.random() + 1).toString(36).substring(7);

describe('Create Receipt', () => {
    it('passes', () => {
        cy.login();
        cy.url().should('include', '/dashboard')

        cy.get('#menu-link').invoke('show').click();
        cy.contains('Belege').click();
        cy.url().should('include', '/receipts');

        cy.get('#button-add-expense').click();

        cy.url().should('include', '/receipt');

        cy.get('#input-file-upload').selectFile('./cypress/uploads/sample-01.pdf');

        cy.get('#input-receipt-number').type(randomReceiptName);
        cy.get('#input-receipt-seller').type("Musterfirma GmbH")
        cy.get('#input-receipt-category').type("Stuff")
        cy.get('#input-receipt-description').type("Zeug")
        cy.get('#input-receipt-amount').type("10000");

        cy.get('#save-button').click();


        cy.logout();
    });
});

describe('Update Receipt', () => {
    it('passes', () => {
        cy.login();

        cy.visit('http://localhost:3000/receipts');

        cy.contains(randomReceiptName).click();

        cy.get('#button-delete-file').click();

        cy.get('#input-file-upload').selectFile('./cypress/uploads/sample-01.pdf');

        cy.get('#input-receipt-description').type("Stuff" + randomReceiptName);

        cy.get('#save-button').click();

        cy.wait(1000);

        cy.visit('http://localhost:3000/receipts');

        cy.contains("Stuff" + randomReceiptName);


        cy.logout();
    });
});

describe('Delete Receipt', () => {
    it('passes', () => {
        cy.login();
        cy.url().should('include', '/dashboard');

        cy.get('#menu-link').invoke('show').click();
        cy.contains('Belege').click();
        cy.url().should('include', '/receipts');

        cy.contains(randomReceiptName).click();
        cy.wait(1000);
        cy.get('#delte-button').click();


        cy.contains(randomReceiptName).should('not.exist');

        cy.logout();
    });
});