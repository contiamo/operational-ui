This component lays out an opinionated application frame with side navigation, a main section and some optional conveniences. It sits at the top level of the page.

### Basic Layout

```jsx
const sidebar = (
  <Sidenav>
    <SidenavHeader condensed icon="Home" label="Project Home" />
    <SidenavHeader label="The Prize" active>
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
  </Sidenav>
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
  <Sidenav>
    <SidenavHeader condensed icon="Home" label="Project Home" />
    <SidenavHeader label="The Prize" active>
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow">
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
  </Sidenav>
)
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
