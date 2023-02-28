/// <reference types="cypress" />

describe('Login with E-Mail and Password', () => {
    it('passes', () => {
        cy.login();
        cy.logout();
    })
});