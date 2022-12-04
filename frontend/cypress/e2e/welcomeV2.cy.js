describe('The Welcome Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('Program');

    cy.contains('OK').click();

    cy.url().should('include', '/feedback');

    cy.contains('Submit').click();
  });
});