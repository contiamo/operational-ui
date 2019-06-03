export const tabPastStyleguidistLinks = () =>
  cy
    .get("body")
    .tab() // Show all components
    .tab() // Props & methods
    .tab() // link in the readme
