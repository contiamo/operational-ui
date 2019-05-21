describe("DataTable", () => {
  before(() => {
    cy.visit("/#!/DataTable/1")
  })
  it("should exist", () => {
    cy.get(".operational-ui__DataTable--virtual-scroller")
  })
  it("should show correct data", () => {
    cy.get(".operational-ui__DataTable--virtual-scroller").contains("1")
  })
  it("should render its footer", () => {
    cy.get(".operational-ui__DataTable--virtual-scroller")
      .parent()
      .contains("Add more rows")
      .click()
  })
  it("should scroll virtually", () => {
    cy.get(".operational-ui__DataTable--virtual-scroller").scrollTo("bottom")
    cy.get(".operational-ui__DataTable--virtual-scroller").contains("Cell 107")
    cy.get(".operational-ui__DataTable--virtual-scroller").contains("Cell 1")
  })
})
