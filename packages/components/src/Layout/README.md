This component lays out an opinionated application frame with side navigation, a main section and some optional conveniences. It sits at the top level of the page.

### Basic Layout

```jsx
const sidebar = (
  <Sidebar expanded>
    <SidebarHeader label="Links">
      <SidebarItem
        onClick={() => {
          window.alert("Hello!")
        }}
      >
        Link 1
      </SidebarItem>
      <SidebarItem>Link 2</SidebarItem>
    </SidebarHeader>
    <SidebarHeader label="Links 2" open>
      <SidebarItem active>Link 3</SidebarItem>
      <SidebarItem>Link 4</SidebarItem>
    </SidebarHeader>
  </Sidebar>
)

// Container must set the height explicitly.
// This component will set height to 100%.
;<div style={{ height: 300 }}>
  <Layout
    sidenav={sidebar}
    header={
      <HeaderBar
        logo={<ContiamoLogo />}
        main={<Select naked options={[{ value: "Contiamo" }]} value="Contiamo" placeholder="Select Project..." />}
        end={<Avatar name="Tejas Kumar" />}
      />
    }
    main={
      <Page
        title="Page Title"
        actions={
          <Button condensed color="ghost">
            Help
          </Button>
        }
      >
        {Array(10)
          .fill("Hello!!!!")
          .map((value, i) => <Card key={i}>{value}</Card>)}
      </Page>
    }
  />
</div>
```

### Loading Data

```jsx
const sidebar = (
  <Sidebar expanded>
    <SidebarHeader label="Links">
      <SidebarItem
        onClick={() => {
          window.alert("Hello!")
        }}
      >
        Link 1
      </SidebarItem>
      <SidebarItem>Link 2</SidebarItem>
    </SidebarHeader>
    <SidebarHeader label="Links 2" open>
      <SidebarItem active>Link 3</SidebarItem>
      <SidebarItem>Link 4</SidebarItem>
    </SidebarHeader>
  </Sidebar>
)

// Container must set the height explicitly.
// This component will set height to 100%.
;<div style={{ height: 300 }}>
  <Layout
    loading
    sidenav={sidebar}
    header={
      <HeaderBar
        logo={<ContiamoLogo />}
        main={<Select naked options={[{ value: "Contiamo" }]} value="Contiamo" placeholder="Select Project..." />}
        end={<Avatar name="Tejas Kumar" />}
      />
    }
    main={
      <Page
        title="Page Title"
        actions={
          <Button condensed color="ghost">
            Help
          </Button>
        }
      >
        {Array(10)
          .fill("Hello!!!!")
          .map((value, i) => <Card key={i}>{value}</Card>)}
      </Page>
    }
  />
</div>
```
