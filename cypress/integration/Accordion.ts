describe("Accordion", () => {
  before(() => {
    cy.visit("/#!/Accordion")
  })

  it("should exist", () => {
    cy.get("[data-cy=operational-ui__Accordion]")
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

    cy.get("body")
      .tab() // Show all components
      .tab() // Props & methods
      .tab() // link
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

    cy.get("body")
      .tab()
      .tab()
      .tab()
      .tab()
      .type(" ")

    cy.get("[data-cy=operational-ui__Accordion]")
      .find("[role=region]")
      .first()
      .should("not.have.attr", "hidden")
  })
})
