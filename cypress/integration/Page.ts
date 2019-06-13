describe("Page", () => {
  before(() => {
    cy.visit("/#!/Page/15")
  })

  it("Focus gets on currently selected tab", () => {
    cy.get("body")
      .tab()
      .tab()
      .tab()
      .tab()

    cy.focused().contains("jobs")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("jobs")
  })

  it("Right arrow key moves focus to the next tab", () => {
    cy.focused().contains("jobs")

    cy.focused().type("{rightarrow}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("functions")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("functions")

    cy.focused().type("{rightarrow}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("overview")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("overview")
  })

  it("Left arrow key moves focus to the previous tab", () => {
    cy.focused().contains("overview")

    cy.focused().type("{leftarrow}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("functions")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("functions")

    cy.focused().type("{leftarrow}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("jobs")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("jobs")
  })

  it("Home Key moves focus to the first tab", () => {
    cy.focused().contains("jobs")

    cy.focused().type("{home}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("overview")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("overview")
  })

  it("End key moves focus to the last tab", () => {
    cy.focused().contains("overview")

    cy.focused().type("{end}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("functions")
    cy.get("body")
      .find("[role=tabpanel]")
      .contains("functions")
  })
})
