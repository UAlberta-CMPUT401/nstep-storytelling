describe('The edit admin page', () => {
  it('successfully loads', () => {
    cy.visit('/edit-admin');

    cy.contains('Account');

    cy.contains('Permissions');

    cy.contains('Save & Return');

    cy.contains('Delete this account').click();

    cy.contains('Are you sure you want to delete');

    cy.contains('Delete');

    cy.contains('No, go back.').click();

    cy.url().should('include', '/login');
  });
});
