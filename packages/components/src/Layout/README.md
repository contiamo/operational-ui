This component lays out an opinionated application frame with side navigation, a main section and some optional conveniences. It sits at the top level of the page.

## Usage

```jsx
const  Breadcrumb = require("../Breadcrumb/Breadcrumb").default

const sidebar = (
  <Sidebar expanded>
      <SidebarHeader label="Links">
        <SidebarItem onClick={() => {window.alert("Hello!")}}>Link 1</SidebarItem>
        <SidebarItem>Link 2</SidebarItem>
      </SidebarHeader>
      <SidebarHeader label="Links 2" open>
        <SidebarItem active>Link 3</SidebarItem>
        <SidebarItem>Link 4</SidebarItem>
      </SidebarHeader>
    </Sidebar>
);

// Container must set the height explicitly.
// This component will set height to 100%.
<Layout
  sidenav={sidebar}
  main={
    <Page
      title="Page Title"
      breadcrumbs={
        <Breadcrumbs>
          <Breadcrumb>One</Breadcrumb>
          <Breadcrumb>Two</Breadcrumb>
          <Breadcrumb>Three</Breadcrumb>
        </Breadcrumbs>
      }
      controls={
        <div>
          <Button condensed color="info">Help</Button>
        </div>
      }
    />
  }
/>
```
