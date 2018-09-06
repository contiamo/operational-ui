/**
 * This file is used as a simple standalone dev server for explorations that
 * don't necessarily make it into styleguidist sample code. They may be exploring
 * bugs, used to develop new features, and test combinations of components standalone
 * for production UI's.
 */
import * as React from "react"
import { render } from "react-dom"

import OperationalUI, {
  Avatar,
  Button,
  Card,
  HeaderBar,
  HeaderMenu,
  Layout,
  Logo,
  Page,
  Sidenav,
  SidenavHeader,
  SidenavItem,
} from "../src"

class Example extends React.Component<{}, {}> {
  public render() {
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
    return (
      <OperationalUI>
        <div>
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
                          body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque arcu, lacinia in sollicitudin eget, porta ac elit. Nam ut metus in libero malesuada vehicula vel ac neque. Nullam ultrices egestas suscipit. Phasellus laoreet sit amet dui vel consectetur. Morbi porttitor metus at tellus placerat, et blandit nisi finibus. Sed euismod ligula mi, quis venenatis ipsum venenatis quis. Praesent sodales massa id neque eleifend accumsan. Nulla ut dui sit amet justo ullamcorper aliquet in et mauris. Phasellus ipsum arcu, pulvinar nec augue et, finibus imperdiet enim. Aliquam erat volutpat. Sed eu justo non justo euismod scelerisque ullamcorper et diam. Vestibulum tempor leo lorem, in pellentesque nulla fermentum placerat. Aenean quam ligula, euismod et viverra a, sollicitudin quis felis. Pellentesque varius, orci ut tristique dignissim, nisi lectus aliquet sem, sed dapibus lectus lectus et metus.
                          
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque arcu, lacinia in sollicitudin eget, porta ac elit. Nam ut metus in libero malesuada vehicula vel ac neque. Nullam ultrices egestas suscipit. Phasellus laoreet sit amet dui vel consectetur. Morbi porttitor metus at tellus placerat, et blandit nisi finibus. Sed euismod ligula mi, quis venenatis ipsum venenatis quis. Praesent sodales massa id neque eleifend accumsan. Nulla ut dui sit amet justo ullamcorper aliquet in et mauris. Phasellus ipsum arcu, pulvinar nec augue et, finibus imperdiet enim. Aliquam erat volutpat. Sed eu justo non justo euismod scelerisque ullamcorper et diam. Vestibulum tempor leo lorem, in pellentesque nulla fermentum placerat. Aenean quam ligula, euismod et viverra a, sollicitudin quis felis. Pellentesque varius, orci ut tristique dignissim, nisi lectus aliquet sem, sed dapibus lectus lectus et metus.
                          
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque arcu, lacinia in sollicitudin eget, porta ac elit. Nam ut metus in libero malesuada vehicula vel ac neque. Nullam ultrices egestas suscipit. Phasellus laoreet sit amet dui vel consectetur. Morbi porttitor metus at tellus placerat, et blandit nisi finibus. Sed euismod ligula mi, quis venenatis ipsum venenatis quis. Praesent sodales massa id neque eleifend accumsan. Nulla ut dui sit amet justo ullamcorper aliquet in et mauris. Phasellus ipsum arcu, pulvinar nec augue et, finibus imperdiet enim. Aliquam erat volutpat. Sed eu justo non justo euismod scelerisque ullamcorper et diam. Vestibulum tempor leo lorem, in pellentesque nulla fermentum placerat. Aenean quam ligula, euismod et viverra a, sollicitudin quis felis. Pellentesque varius, orci ut tristique dignissim, nisi lectus aliquet sem, sed dapibus lectus lectus et metus.`,
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
      </OperationalUI>
    )
  }
}

render(<Example />, document.getElementById("app"))
