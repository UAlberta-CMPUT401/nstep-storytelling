describe('The create account page', () => {
  it('successfully loads', () => {
    cy.visit('/create-account');

    cy.contains('Email');

    cy.contains('Password');

    cy.contains('Confirm Password');

    cy.contains('Permissions');

    cy.contains('Cancel').click();

    cy.url().should('include', '/login');
  });
});
