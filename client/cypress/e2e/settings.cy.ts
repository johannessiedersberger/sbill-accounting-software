/// <reference types="cypress" />

const randomCompanyName = (Math.random() + 1).toString(36).substring(7);

describe('Edit Settings', () => {
    it('passes', () => {
        cy.login();
        cy.url().should('include', '/dashboard');

        cy.get('#menu-link').invoke('show').click();
        cy.contains('Einstellungen').click();
        cy.url().should('include', '/settings');

        cy.get('#input-company-name').clear().type(randomCompanyName);

        cy.get('#button-save').click();

        cy.get('#menu-link').invoke('show').click();
        cy.contains('Dashboard').click();
        cy.url().should('include', '/dashboard');

        cy.get('#menu-link').invoke('show').click();
        cy.contains('Einstellungen').click();
        cy.url().should('include', '/settings');

        cy.get('#input-company-name').should('have.value', randomCompanyName);

        cy.get('#input-company-name').clear().type("Johannes Siedersberger IT-Beratung");

        cy.get('#button-save').click();


        cy.logout();
    });
});