describe("Flow", () => {
  before(() => {
    cy.visit("/#!/Flow")
  })
  describe("Presence", () => {
    it("should render labels", () => {
      ;["Yes", "People", "History", "Troy", "Loss", "Atoms", "Discover", "Network"].forEach(label => cy.contains(label))
    })
  })
  describe("Behavior", () => {
    it("should handle clicks correctly", () => {
      cy.contains("Active Item Index: 0")
      cy.get('[data-cy="operational-ui__flow flow__box box-atoms"]').click()
      cy.contains("Active Item Index: 1")
    })
    it("should be keyboard accessible", () => {
      cy.get('[data-cy="operational-ui__flow flow__box box-atoms"]')
        .click()
        .tab()
        .tab()
      cy.focused().contains("Network")
    })
  })
})
