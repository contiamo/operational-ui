describe("Tour Modal", () => {
  before(() => {
    cy.visit("/#!/TourModal")
  })
  describe("Full Screen Example", () => {
    it("Should render correctly", () => {
      cy.contains("View Full Example").click()
      cy.get(`[data-cy="operational-ui-TourModal"]`).then(el => console.dir(el))
    })
    it("Should alert on click", () => {
      cy.contains("Continue")
    })
    it("Should close", () => {
      cy.contains("Quit the Tour").click()
    })
  })
  describe("Full Screen Example", () => {
    it("Should render correctly", () => {
      cy.contains("View Compact Example").click()
    })
    it("Should alert on click", () => {
      cy.contains("Continue")
    })
    it("Should close", () => {
      cy.contains("Quit the Tour").click()
    })
  })
})
