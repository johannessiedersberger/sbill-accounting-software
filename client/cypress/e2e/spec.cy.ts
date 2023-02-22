/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.get('#email-input').type("johannes.siedersberger@gmx.de");
    cy.get('#password-input').type("1234");
    cy.get('#login-button').click();
    cy.contains('Logout');
    cy.url().should('include', '/dashboard')
  })
})