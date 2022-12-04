describe('The Welcome Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('Program');

    cy.contains('Admin Login').click();

    cy.url().should('include', '/login');
  });
});
