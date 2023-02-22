/// <reference types="cypress" />

describe('Login with E-Mail and Password', () => {
  it('passes', () => {
    cy.login();
  })
})

describe('Create Invoice', () => {
  it('passes', () => {
    cy.login();
    cy.url().should('include', '/dashboard')
    cy.get('#menu-link').invoke('show').click();
    cy.contains('Rechnungen').click();
    cy.url().should('include', '/invoices');
    cy.contains('Neue Rechnung').click();
    cy.contains('Rechnung');

  })
})