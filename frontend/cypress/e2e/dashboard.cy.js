describe('The Dashboard Page', () => {
    it('successfully loads', () => {
      cy.visit('/dashboard')

      cy.contains('Forms').click()

      cy.contains('+ Create Form')

      cy.contains('Feedback').click()

      cy.contains('Search')

      cy.contains('Logout').click()

      cy.url().should('include', '/login')
    })
  })
  