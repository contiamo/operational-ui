import { tabPastStyleguidistLinks } from "../support/helpers"

describe("Steeper", () => {
  before(() => {
    cy.visit("/#!/Stepper")
  })

  it("allows cycling through provided steps", () => {
    cy.get("[data-cy=operational-ui__Stepper]")
      .find("[role=tab]")
      .first()
      .should("have.attr", "aria-selected")

    tabPastStyleguidistLinks()
    cy.focused().contains("Select Your Git Provider")

    tabPastStyleguidistLinks()
      .tab()
      .click()

    tabPastStyleguidistLinks()
    cy.focused().contains("Authenticate")

    tabPastStyleguidistLinks()
      .tab()
      .click()

    tabPastStyleguidistLinks()
    cy.focused().contains("Select Repositories")

    tabPastStyleguidistLinks()
      .tab()
      .click()

    cy.contains("Go Back to the First Slide")
  })
})
