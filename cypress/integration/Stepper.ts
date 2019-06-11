import { tabPastStyleguidistLinks } from "../support/helpers"

describe("Stepper", () => {
  beforeEach(() => {
    cy.visit("/#!/Stepper")
  })

  it("allows jumping to the exact step by clicking a header", () => {
    cy.contains("Go to Step 2") // We are at the first step of the Stepper

    cy.get("[data-cy=operational-ui__Stepper]")
      .find("[role=tab]")
      .last() // Last header in the Stepper
      .click()

    tabPastStyleguidistLinks()
    cy.focused().contains("Import")
    cy.contains("Go Back to the First Slide") // We are at the last step of the Stepper
  })

  it("allows cycling through provided steps while navigating with the tab around step content", () => {
    cy.get("[data-cy=operational-ui__Stepper]")
      .find("[role=tab]")
      .first()
      .should("have.attr", "aria-selected")

    tabPastStyleguidistLinks()
    cy.focused().contains("Select Your Git Provider") // Step 1

    tabPastStyleguidistLinks()
      .tab()
      .click()

    tabPastStyleguidistLinks()
    cy.focused().contains("Authenticate") // Step 2

    tabPastStyleguidistLinks()
      .tab()
      .click()

    tabPastStyleguidistLinks()
    cy.focused().contains("Select Repositories") // Step 3

    tabPastStyleguidistLinks()
      .tab()
      .click()

    cy.contains("Go Back to the First Slide") // We are at the first step of the Stepper
  })

  it("allows navigation with left and right arrows and Enter key", () => {
    cy.get("[data-cy=operational-ui__Stepper]")
      .find("[role=tab]")
      .first()
      .wait(1000)
      .type("{rightarrow}{rightarrow}")
      .focused()
      .contains("Select Repositories") // Step 3
      .type("{enter}")

    cy.get('[data-cy="operational-ui__Stepper-content"]').contains("Step 3: anything goes")

    cy.focused()
      .tab()
      .tab({ shift: true })
      .type("{leftarrow}{leftarrow}")
      .focused()
      .contains("Select Your Git Provider")
      .type("{enter}")

    cy.get('[data-cy="operational-ui__Stepper-content"]').contains("Go to Step 2")
  })
})
