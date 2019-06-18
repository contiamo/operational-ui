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
    let navigatedAway = false
    cy.on("window:before:unload", e => {
      navigatedAway = true
      e.preventDefault()
    })

    cy.visit("/#!/Breadcrumbs")

    cy.tab()
      .tab()
      .tab()
      .tab()
      .tab()
      .tab()
      .tab()
      .tab()

    cy.focused().contains("Breadcrumb")

    cy.focused()
      .type("{enter}")
      .then(() => expect(navigatedAway).to.equal(true))
  })

  it("Breadcrumbs link navigates to breadcrumbs docs", () => {
    let navigatedAway = false
    cy.on("window:before:unload", e => {
      navigatedAway = true
      e.preventDefault()
    })

    cy.visit("/#!/Breadcrumb")

    cy.get("body")
      .tab()
      .tab()
      .tab()

    cy.focused().contains("Breadcrumbs")

    cy.focused()
      .type("{enter}")
      .then(() => expect(navigatedAway).to.equal(true))
  })
})
