describe("DataTable", () => {
  before(() => {
    cy.visit("/#!/DataTable")
  })
  it("should exist", () => {
    cy.get(".operational-ui__DataTable--virtual-scroller")
  })
  it("should respect the design: (regular mode) row headers are 35px", () => {
    cy.get(`[data-cy="operational-ui__DataTable-row-header"]`)
      .first()
      .then(el => {
        expect(el.height()).to.equal(35)
      })
  })
  it("should respect the design: (regular mode) rows are 35px", () => {
    cy.get(`[data-cy="operational-ui__DataTable-row"]`)
      .first()
      .then(el => {
        expect(el.height()).to.equal(35)
      })
  })
  it("should respect the design: (compact mode) row headers are 35px", () => {
    cy.visit("/#!/DataTable/3")

    cy.get(`[data-cy="operational-ui__DataTable-row-header"]`)
      .first()
      .then(el => {
        expect(el.height()).to.equal(35)
      })
  })
  it("should respect the design: (compact mode) rows are 22px", () => {
    cy.visit("/#!/DataTable/3")

    cy.get(`[data-cy="operational-ui__DataTable-row"]`)
      .first()
      .then(el => {
        expect(el.height()).to.equal(22)
      })
  })
  it("should show correct data", () => {
    cy.visit("/#!/DataTable")
    cy.get(".operational-ui__DataTable--virtual-scroller").contains("1")
  })
  it("should render its footer", () => {
    cy.get(".operational-ui__DataTable--virtual-scroller")
      .parent()
      .contains("Add more rows")
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
  })
  it("should scroll virtually", () => {
    cy.get(".hola-amigo > .operational-ui__DataTable--virtual-scroller").scrollTo("bottom")
    cy.get(".hola-amigo > .operational-ui__DataTable--virtual-scroller").contains("Cell 958695")
  })
  it("should support inputs", () => {
    cy.visit("/#!/DataTableInput")
    cy.get('[id^="input-field-"]')
  })
  it("should support input validation", () => {
    cy.get('[id^="input-field-"]').type("ola amgio como estas")
    cy.contains("Only numbers please!")
  })
  it("should support selects", () => {
    cy.get('[role="listbox"]')
      .first()
      .click()
    cy.contains("Other Dropdown Option")
  })
})
