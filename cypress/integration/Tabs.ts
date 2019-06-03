import { tabPastStyleguidistLinks } from "../support/helpers"

describe("Tabs", () => {
  before(() => {
    cy.visit("/#!/Tabs")
  })

  it("Opens corresponding tab when you click header", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("have.attr", "hidden")

    cy.contains("tab 4").click()

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("`x` icon closes corresponding tab", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 4)

    cy.contains("tab 4")
      .find("svg")
      .last()
      .click()

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 3)
  })

  it("Focus gets on currently selected tab", () => {
    tabPastStyleguidistLinks().tab() // Selected header in Tabs

    cy.focused().contains("tab 3")
  })

  it("Home Key moves focus to the first tab", () => {
    cy.focused().contains("tab 3")

    cy.focused().type("{home}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("tab 1")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .first()
      .should("not.have.attr", "hidden")
  })

  it("End key moves focus to the last tab", () => {
    cy.focused().contains("tab 1")

    cy.focused().type("{end}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("tab 3")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("Right arrow key moves focus to the next tab", () => {
    cy.focused().contains("tab 3")

    cy.focused().type("{rightarrow}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("tab 1")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .first()
      .should("not.have.attr", "hidden")
  })

  it("Left arrow key moves focus to the previous tab", () => {
    cy.focused().contains("tab 1")

    cy.focused().type("{leftarrow}")
    cy.wait(50) // we need to wait a bit because focus switch doesn't happen immediately

    cy.focused().contains("tab 3")
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("Delete key closes tab", () => {
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

  it("Add button adds tab", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 2)

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tab]")
      .last()
      .click()

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 3)
  })

  it("Enter key adds tab", () => {
    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 3)

    cy.focused().type("{Enter}")

    cy.get("[data-cy=operational-ui__Tabs]")
      .find("[role=tabpanel]")
      .should("have.length", 4)
    cy.focused().contains("tab 4")
  })
})
