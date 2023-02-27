/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.get('#email-input').type("johannes.siedersberger@gmx.de");
    cy.get('#password-input').type("1234");
    cy.get('#login-button').click();
    cy.contains('Logout');
});

Cypress.Commands.add('logout', () => {
    cy.contains('Logout').click();
    cy.contains('Not registered? ');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export { }
declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable<void>
            logout(): Chainable<void>
            // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}