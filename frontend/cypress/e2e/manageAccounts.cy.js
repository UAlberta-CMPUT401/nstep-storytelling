describe('The account management page', () => {
  it('successfully loads', () => {
    cy.visit('/manage-accounts');

    cy.contains('Manage accounts');

    cy.contains('Add an admin').click();

    cy.url().should('include', '/create-account');
  });
});