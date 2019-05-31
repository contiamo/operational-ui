describe("Tabs", () => {
  const skipStyleguidistLinks = () =>
    cy
      .get("body")
      .tab() // Show all components
      .tab() // Props & methods
      .tab() // link in the readme

  before(() => {
    cy.visit("/#!/Tabs")
  })

  it("opens section if you click corresponding header", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("have.attr", "hidden")

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tab]")
      .last()
      .click()

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("closes section if you click `x` icon in corresponding header", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 4)

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tab]")
      .find("svg")
      .last()
      .click()

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 3)
    cy.focused().should("have.length", 0)
  })

  it("tab gets on currently selected tab", () => {
    skipStyleguidistLinks().tab() // Selected header in Tabs

    cy.focused().contains("tab 3")
  })

  it("home button moves focus to the first tab", () => {
    cy.focused().contains("tab 3")

    cy.focused().type("{home}")

    cy.focused().contains("tab 1")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .first()
      .should("not.have.attr", "hidden")
  })

  it("end button moves focus to the last tab", () => {
    cy.focused().contains("tab 1")

    cy.focused().type("{end}")

    cy.focused().contains("tab 3")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("right arrow moves focus to the next tab", () => {
    cy.focused().contains("tab 3")

    cy.focused().type("{rightarrow}")

    cy.focused().contains("tab 1")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .first()
      .should("not.have.attr", "hidden")
  })

  it("left arrow moves focus to the previous tab", () => {
    cy.focused().contains("tab 1")

    cy.focused().type("{leftarrow}")

    cy.focused().contains("tab 3")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("delete button coloses tab", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 3)
    cy.focused().contains("tab 3")

    cy.focused().type("{del}")

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 2)
    cy.focused().contains("tab 2")
  })
})
