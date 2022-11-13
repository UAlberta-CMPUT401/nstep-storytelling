describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('/login');

    cy.contains('Login').click();

    cy.get('button').contains('Login').click();

    cy.url().should('include', '/dashboard');
  });
});
