describe("Breadcrumbs", () => {
  before(() => {
    cy.visit("/#!/Breadcrumbs")
  })

  it("Focus moves to single breadcrumb", () => {
    cy.get("body")
      .tab()
      .tab()
      .tab()

    cy.focused().contains("Home")
  })

  it("Breadcrumb link navigates to breadcrumb docs", () => {
    cy.tab()
      .tab()
      .tab()
      .tab()
      .tab()

    cy.focused().contains("Breadcrumb")

    cy.focused().click()

    cy.get("body").contains("Breadcrumb ")
  })

  it("Breadcrumbs link navigates to breadcrumbs docs", () => {
    cy.visit("/#!/Breadcrumb")

    cy.get("body")
      .tab()
      .tab()
      .tab()

    cy.focused().contains("Breadcrumbs")

    cy.focused().click()

    cy.get("body").contains("Breadcrumbs")
  })
})
