describe("Sidenav", () => {
  it("should render headers", () => {
    cy.visit("/#!/Sidenav")
    cy.contains("Inactive SidenavHeader")
      .children()
      .should("not.exist")
    cy.contains("Active SidenavHeader")
  })
  it("should render children", () => {
    cy.visit("/#!/Sidenav")
    cy.contains("Active SidenavHeader")
      .parent()
      .parent()
      .find('[data-cy="operational-ui__sidenav-items"]')
      .children("div")
      .each((child, index) => {
        const values = ["The First Prize", "The Second Prize", "No Short Label"]
        expect(child.text()).to.equal(values[index])
      })
  })
  it("should follow links", () => {
    cy.visit("/#!/SidenavItem")
    let navigatedAway = false
    cy.on("window:before:unload", e => {
      navigatedAway = true
      e.preventDefault()
    })
    cy.tab()
      .tab()
      .tab()
      .tab()
      .type("{enter}")
      .then(() => expect(navigatedAway).to.equal(true))
  })
  it("should support a popout menu via mouse", () => {
    cy.contains("Overview")
      .trigger("mouseover")
      .contains("Fabien")
      .parent()
      .parent()
      .contains("Cheese")
      .trigger("mouseover")
      .parent()
      .contains("Ice")

    cy.get('[data-cy="operational-ui__SidenavItemPopover"]')
      .should("be.visible")
      .should("have.length", 2)

    cy.contains("Overview").trigger("mouseout")
  })
  it("should support a popout menu via keyboard", () => {
    cy.get("body")
      .tab()
      .tab()
      .tab()
      .type("{downarrow}")

    cy.get('[data-cy="operational-ui__SidenavItemPopover"]')
      .should("be.visible")
      .should("have.length", 1)

    cy.wait(300)
    cy.get("body")
      .tab()
      .tab()
      .tab()
      .focused()
      .type("{downarrow}")
      .focused()
      .type("{downarrow}{downarrow} ")

    cy.get('[data-cy="operational-ui__SidenavItemPopover"]').should("have.length", 2)
  })
  it("should not have its popup go off screen", () => {
    cy.visit("/#!/SidenavItem/1")
    cy.viewport(548, 620)

    // Top
    cy.get("body")
      .tab()
      .tab()
      .tab()
      .focused()
      .type("{downarrow}")

    cy.get('[data-cy="operational-ui__SidenavItemPopover"]')
      .should("be.visible")
      .should("have.length", 1)

    cy.reload()
    cy.get("body")
      .tab()
      .tab()
      .tab()
      .focused()
      .type("{downarrow}")

    // Bottom
    cy.reload()
    cy.scrollTo(0, 0)
    cy.get("body")
      .tab()
      .tab()
      .tab()
      .tab()
      .tab()
      .type("{downarrow}")

    cy.get('[data-cy="operational-ui__SidenavItemPopover"]')
      .should("be.visible")
      .should("have.length", 1)
  })
})
