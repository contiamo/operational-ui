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
              .map((value, i) => (
                <Card key={i}>{value}</Card>
              ))}

            <Card title="Partial Kanye Lyrics">
              <div>
                <Button
                  color="#314865"
                  textColor="#2bda64"
                  onClick={() => {
                    confirm({
                      title: "Yikes",
                      body: (
                        <Form>
                          <Body>You can only add users who are already in your organization.</Body>
                          <Autocomplete
                            onResultClick={result => alert("Thanks for choosing " + result.label)}
                            value="Click me for results..."
                            results={[
                              { label: "Tweakin', tweakin' off that 2CB, huh?" },
                              { label: "Is he gon' make it? TBD, huh" },
                              { label: "Thought I was gon' run, DMC, huh?" },
                              { label: "I done died and lived again on DMT, huh" },
                            ]}
                            fullWidth
                            label="Sometimes I scare myself, myself"
                          />
                        </Form>
                      ),
                    })
                  }}
                >
                  Open a Confirm
                </Button>
                <Button
                  color="#f89663"
                  onClick={() => {
                    confirm({
                      fullSize: true,
                      title: "Waves",
                      body: `Turn it up!
Waves don't die
Let me crash here for the moment
I don't need to own it
No lie
Waves don't die
Let me crash here for a moment
I don't, I don't need to own...
Sun don't shine in the shade (turn it up!)
Bird can't fly in a cage (turn it up!)
Even when somebody go away (turn it up!)
The feelings don't really go away
That's just the wave (yeah)`
                        .split("\n")
                        .map(line => (
                          <>
                            {line}
                            <br />
                          </>
                        )),
                    })
                  }}
                >
                  Open a full-size Confirm
                </Button>
                <Button
                  color="#613f90"
                  textColor="#fb059e"
                  onClick={() => {
                    modal({
                      title: "Stronger",
                      body: `N-now th-that that don't kill me
Can only make me stronger
I need you to hurry up now
'Cause I can't wait much longer
I know I got to be right now
'Cause I can't get much wronger
Man I've been waiting all night now
That's how long I been on ya
I need you right now
Let's get lost tonight`
                        .split("\n")
                        .map(line => (
                          <>
                            {line}
                            <br />
                          </>
                        )),
                    })
                  }}
                >
                  Open a Modal
                </Button>
                <Button
                  color="#f89663"
                  onClick={() => {
                    modal({
                      fullSize: true,
                      title: "FML",
                      body: `I been waiting for a minute
For my lady
I been living without limits
As far as my business
I'm the only one that's in control
I been feeling all I've given
For my children
I will die for those I love

God, I'm willing
To make this my mission
Give up the women
Before I lose half of what I own
I been thinking
About my vision
Pour out my feelings
Revealing the layers to my soul, my soul
The layers to my soul
Revealing the layers to my soul
`
                        .split("\n")
                        .map(line => (
                          <>
                            {line}
                            <br />
                          </>
                        )),
                    })
                  }}
                >
                  Open a full-size Modal
                </Button>
              </div>
            </Card>
          </>
        )}
      </Page>
    }
  />
</div>
```

### Without a Page Title

This is an example of a basic layout _without_ a page title. Content at the bottom should be correctly visible.

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
              .map((value, i) => (
                <Card key={i}>{value}</Card>
              ))}

            <Card title="Partial Kanye Lyrics">
              <div>
                <Button
                  color="#314865"
                  textColor="#2bda64"
                  onClick={() => {
                    confirm({
                      title: "Yikes",
                      body: (
                        <Form>
                          <Body>You can only add users who are already in your organization.</Body>
                          <Autocomplete
                            onResultClick={result => alert("Thanks for choosing " + result.label)}
                            value="Click me for results..."
                            results={[
                              { label: "Tweakin', tweakin' off that 2CB, huh?" },
                              { label: "Is he gon' make it? TBD, huh" },
                              { label: "Thought I was gon' run, DMC, huh?" },
                              { label: "I done died and lived again on DMT, huh" },
                            ]}
                            fullWidth
                            label="Sometimes I scare myself, myself"
                          />
                        </Form>
                      ),
                    })
                  }}
                >
                  Open a Confirm
                </Button>
                <Button
                  color="#f89663"
                  onClick={() => {
                    confirm({
                      fullSize: true,
                      title: "Waves",
                      body: `Turn it up!
Waves don't die
Let me crash here for the moment
I don't need to own it
No lie
Waves don't die
Let me crash here for a moment
I don't, I don't need to own...
Sun don't shine in the shade (turn it up!)
Bird can't fly in a cage (turn it up!)
Even when somebody go away (turn it up!)
The feelings don't really go away
That's just the wave (yeah)`
                        .split("\n")
                        .map(line => (
                          <>
                            {line}
                            <br />
                          </>
                        )),
                    })
                  }}
                >
                  Open a full-size Confirm
                </Button>
                <Button
                  color="#613f90"
                  textColor="#fb059e"
                  onClick={() => {
                    modal({
                      title: "Stronger",
                      body: `N-now th-that that don't kill me
Can only make me stronger
I need you to hurry up now
'Cause I can't wait much longer
I know I got to be right now
'Cause I can't get much wronger
Man I've been waiting all night now
That's how long I been on ya
I need you right now
Let's get lost tonight`
                        .split("\n")
                        .map(line => (
                          <>
                            {line}
                            <br />
                          </>
                        )),
                    })
                  }}
                >
                  Open a Modal
                </Button>
                <Button
                  color="#f89663"
                  onClick={() => {
                    modal({
                      fullSize: true,
                      title: "FML",
                      body: `I been waiting for a minute
For my lady
I been living without limits
As far as my business
I'm the only one that's in control
I been feeling all I've given
For my children
I will die for those I love

God, I'm willing
To make this my mission
Give up the women
Before I lose half of what I own
I been thinking
About my vision
Pour out my feelings
Revealing the layers to my soul, my soul
The layers to my soul
Revealing the layers to my soul
`
                        .split("\n")
                        .map(line => (
                          <>
                            {line}
                            <br />
                          </>
                        )),
                    })
                  }}
                >
                  Open a full-size Modal
                </Button>
              </div>
            </Card>
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
              .map((value, i) => (
                <Card key={i}>{value}</Card>
              ))}
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
          .map((value, i) => (
            <Card key={i}>{value}</Card>
          ))}
      </Page>
    }
  />
</div>
```
