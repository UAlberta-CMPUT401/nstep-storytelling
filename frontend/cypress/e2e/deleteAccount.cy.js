describe('The delete account page', () => {
  it('successfully loads', () => {
    cy.visit('/delete-account');
    cy.contains('Are you sure you want to delete');
    cy.contains('Delete');
    cy.contains('No, go back.').click();
  });
});