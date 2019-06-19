describe("Input", () => {
  it("should be visible in the DOM", () => {
    cy.visit("/#!/Input/17")
    cy.get('[data-cy="operational-ui__Input"]')
  })

  it("Should be clearable when clicking a dedicated button", () => {
    cy.visit("/#!/Input/3")

    cy.get('input[value="Clear me..."]')
    cy.get('[data-cy="operational-ui__Input-clear-button"]')

    cy.get('[data-cy="operational-ui__Input"]')
      .tab()
      .click()

    cy.get('input[value="Clear me..."]').should("not.exist")
    cy.get('[data-cy="operational-ui__Input-clear-button"]').should("not.exist")
  })

  it("Should be clearable when has Id style", () => {
    cy.visit("/#!/Input/17")
    cy.get('input[value="MyTable_01"]')
    cy.get('[data-cy="operational-ui__Input-clear-button"]').click()
    cy.get('input[value="MyTable_01"]').should("not.exist")
  })

  it("Should display custom status icon if provided", () => {
    cy.visit("/#!/Input/19")
    cy.get('[data-cy="operational-ui__Input-status-icon"]')
  })
})
