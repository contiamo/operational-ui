import { tabPastStyleguidistLinks } from "../support/helpers"

describe("Accordion", () => {
  before(() => {
    cy.visit("/#!/Accordion")
  })

  it("opens section if you click corresponding header", () => {
    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .last()
      .should("have.attr", "hidden")

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=button]")
      .last()
      .click()

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .last()
      .should("not.have.attr", "hidden")
  })

  it("closes section if you click corresponding header", () => {
    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .last()
      .should("not.have.attr", "hidden")

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=button]")
      .last()
      .click()

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .last()
      .should("have.attr", "hidden")
  })

  it("closes section if you focus and press spacebar at corresponding header", () => {
    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .first()
      .should("not.have.attr", "hidden")

    tabPastStyleguidistLinks()
      .tab() // First header in Accordion
      .type(" ")

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .first()
      .should("have.attr", "hidden")
  })

  it("opens section if you focus and press spacebar at corresponding header", () => {
    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .first()
      .should("have.attr", "hidden")

    tabPastStyleguidistLinks()
      .tab()
      .type(" ")

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .first()
      .should("not.have.attr", "hidden")
  })
})
