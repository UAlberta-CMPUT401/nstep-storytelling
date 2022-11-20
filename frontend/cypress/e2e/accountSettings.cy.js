describe('The account settings Page', () => {
  it('successfully loads', () => {
    cy.visit('/account');

    cy.contains('Account settings');

    cy.contains('Permissions');
  });
});