describe('The Dashboard Page', () => {
  it('successfully loads', () => {
    cy.visit('/home');

    cy.contains('Forms').click();

    cy.contains('+ Create Form');

    cy.contains('Feedback').click();

    cy.contains('Search');

    cy.contains('Logout').click();

    cy.url().should('include', '/login');
  });
});
