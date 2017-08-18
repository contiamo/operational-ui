export default `
<Sidebar>

  <SidebarItem label="Links">
    <SidebarLink
      onClick={() => window.open('https://www.contiamo.com')}
      symbol="&rarr"
    >
      Link 1
    </SidebarLink>
    <SidebarLink>Link 2</SidebarLink>
  </SidebarItem>

  <SidebarItem
    label="Deutschlandliebe 🇩🇪"
    tooltip="Click for async fun!"
    onClick={() => fetch('SOME URL')}
  >
    <SidebarLink color="#000">
      You should
    </SidebarLink>
    <SidebarLink
      color="#f00"
      tooltip="Notice how the text is always readable. 😉"
    >
      only see me
    </SidebarLink>
    <SidebarLink color="#ff0">
      after fetch.
    </SidebarLink>
  </SidebarItem>

</Sidebar>
`
