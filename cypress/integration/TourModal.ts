describe("Tour Modal", () => {
  before(() => {
    cy.visit("/#!/TourModal")
  })

  describe("Full Screen Example", () => {
    it("should render correctly", () => {
      cy.contains("View Full Example").click()
      cy.get(`[data-cy="operational-ui-TourModal"]`)
    })
    it("should alert on click", () => {
      cy.contains("Continue")
    })
    it("should close", () => {
      cy.contains("Quit the Tour").click()
    })
    describe("Accessibility", () => {
      it("should be closable via Escape", () => {
        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()
        cy.get("body").trigger("keydown", { key: "Escape" })
        cy.get('[data-cy="operational-ui-TourModal"]').should("not.exist")
      })
      it("should support tabbing to controls", () => {
        // Cancel button
        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()

        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()

        cy.get('[data-cy="operational-ui-TourModal"]').should("not.exist")

        // Finish Button
        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()

        cy.get("body")
          .tab()
          .tab()
          .tab()
          .tab()
          .click()

        cy.get('[data-cy="operational-ui-TourModal"]').should("not.exist")
      })
    })
  })

  describe("Full Screen Example", () => {
    it("should render correctly", () => {
      cy.contains("View Compact Example").click()
    })
    it("should alert on click", () => {
      cy.contains("Continue")
    })
    it("should close", () => {
      cy.contains("Quit the Tour").click()
    })
    describe("Accessibility", () => {
      it("should be closable via Escape", () => {
        cy.get("body")
          .tab()
          .tab()
          .tab()
          .tab()
          .tab()
          .tab()
          .click()
        cy.get("body").trigger("keydown", { key: "Escape" })
        cy.get('[data-cy="operational-ui-TourModal"]').should("not.exist")
      })
      it("should support tabbing to controls", () => {
        // Cancel button
        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()

        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()

        cy.get('[data-cy="operational-ui-TourModal"]').should("not.exist")

        // Finish Button
        cy.get("body")
          .tab()
          .tab()
          .tab()
          .click()

        cy.get("body")
          .tab()
          .tab()
          .tab()
          .tab()
          .click()

        cy.get('[data-cy="operational-ui-TourModal"]').should("not.exist")
      })
    })
  })
})
