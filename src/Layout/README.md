This component lays out an opinionated application frame with side navigation, a main section and some optional conveniences. It sits at the top level of the page.

### Basic Layout

This is an example of a basic layout. Overflowing side and main sections scroll independently.

```jsx
const sidebar = (
  <Sidenav>
    <SidenavHeader condensed icon="Home" label="Project Home" />
    <SidenavHeader label="The Prize" active>
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow" active>
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
    <SidenavHeader label="Let It Snow" active>
      <SidenavItem label="The First Prize" icon="Settings" />
      <SidenavItem label="The Second Prize" icon="Settings" />
      <SidenavItem label="The Third Prize" icon="Settings" />
    </SidenavHeader>
  </Sidenav>
)

// Container must set the height explicitly.
// This component will set height to 100%.
;<div style={{ height: 400 }}>
  <Layout
    sidenav={sidebar}
    header={
      <HeaderBar
        logo={<Logo name="Contiamo" />}
        main={
          <HeaderMenu
            withCaret
            items={[
              { key: "project1", label: "Project 1" },
              { key: "project2", label: "Project 2" },
              { key: "project3", label: "Project 3" },
            ]}
          >
            Project 1
          </HeaderMenu>
        }
        end={
          <HeaderMenu
            items={[{ key: "account", label: "My account" }, { key: "log-out", label: "Log out" }]}
            align="right"
          >
            Imogen Mason <Avatar name="Imogen Mason" />
          </HeaderMenu>
        }
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
        {({ confirm, modal }) => (
          <>
            {Array(10)
              .fill("Hello!!!!")
              .map((value, i) => <Card key={i}>{value}</Card>)}
            <Button
              onClick={() => {
                confirm({
                  title: "Are you sure",
                  body: "This is a scary operation.",
                })
              }}
            >
              Open a modal
            </Button>
          </>
        )}
      </Page>
    }
  />
</div>
```

### Example with Compact Sidenav

```jsx
const sidebar = (
  <Sidenav compact>
    <SidenavHeader label="Use cases">
      <SidenavItem label="Overview" icon="Home" />
      <SidenavItem label="Use Cases" icon="Search" />
      <SidenavItem label="Guides" icon="Document" />
    </SidenavHeader>
    <SidenavItem active end label="Other Guy" icon="User" />
    <SidenavItem end label="Admin" icon="Jobs" />
  </Sidenav>
)

// Container must set the height explicitly.
// This component will set height to 100%.
;<div style={{ height: 600 }}>
  <Layout
    sidenav={sidebar}
    header={
      <HeaderBar
        logo={<Logo name="Contiamo" />}
        main={
          <HeaderMenu
            withCaret
            items={[
              { key: "project1", label: "Project 1" },
              { key: "project2", label: "Project 2" },
              { key: "project3", label: "Project 3" },
            ]}
          >
            Project 1
          </HeaderMenu>
        }
        end={
          <HeaderMenu
            items={[{ key: "account", label: "My account" }, { key: "log-out", label: "Log out" }]}
            align="right"
          >
            Imogen Mason <Avatar name="Imogen Mason" />
          </HeaderMenu>
        }
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
        {({ confirm, modal }) => (
          <>
            {Array(10)
              .fill("Hello!!!!")
              .map((value, i) => <Card key={i}>{value}</Card>)}
            <Button
              onClick={() => {
                confirm({
                  title: "Are you sure",
                  body: "This is a scary operation.",
                })
              }}
            >
              Open a modal
            </Button>
          </>
        )}
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
;<div style={{ height: 400 }}>
  <Layout
    loading
    sidenav={sidebar}
    header={
      <HeaderBar
        logo={<Logo name="Contiamo" />}
        main={
          <HeaderMenu
            withCaret
            items={[
              { key: "project1", label: "Project 1" },
              { key: "project2", label: "Project 2" },
              { key: "project3", label: "Project 3" },
            ]}
          >
            Project 1
          </HeaderMenu>
        }
        end={
          <HeaderMenu
            items={[{ key: "account", label: "My account" }, { key: "log-out", label: "Log out" }]}
            align="right"
          >
            Imogen Mason <Avatar name="Imogen Mason" />
          </HeaderMenu>
        }
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
