/// <reference types="cypress" />

const randomName = (Math.random() + 1).toString(36).substring(7);

describe('Create Invoice', () => {
    it('passes', () => {
        cy.login();

        cy.url().should('include', '/dashboard')
        cy.get('#menu-link').invoke('show').click();
        cy.contains('Rechnungen').click();
        cy.url().should('include', '/invoices');
        cy.contains('Neue Rechnung').click();
        cy.contains('Rechnung');

        cy.get('#customer-name').type('Max Mustermann').type('{enter}');
        cy.get('#address')
            .type('Musterstr. 1')
            .type('{enter}')
            .type('12345 Musterstadt');
        cy.get('#created-date')
            .clear()
            .type('01/01/2023');
        cy.get('#due-date')
            .clear()
            .type('01/30/2023')
            .type('{enter}');

        cy.get('#topic')
            .type(randomName);

        cy.get('#add-item-button').click().click();

        cy.get('#description-0').type('Web-App');
        cy.get('#quantity-0').type('1');
        cy.get('#price-per-item-0').type('10000');

        cy.get('#description-1').type('Web-App');
        cy.get('#quantity-1').type('1');
        cy.get('#price-per-item-1').type('1200');

        cy.get('#description-field').type('Description');

        cy.get('#save-button').click();
        cy.contains('Invoice Update Erfolgreich');


        cy.logout();

    });
});

describe('Delete Invoice', () => {
    it('passes', () => {
        cy.login();
        cy.url().should('include', '/dashboard')

        cy.get('#menu-link').invoke('show').click();
        cy.contains('Rechnungen').click();
        cy.url().should('include', '/invoices');

        cy.contains(randomName).click();
        cy.get('#delete-button').click();

        cy.logout();
    });
});
