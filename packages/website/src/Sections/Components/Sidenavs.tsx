import * as React from "react"
import { Div } from "glamorous"
import { Sidenav, SidenavHeader } from "@operational/components"

export const title = "Sidenavs"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/sidenav.md"

export const Component = () => (
  <React.Fragment>
    <Div css={{ height: 220 }}>
      <Sidenav expanded>
        <SidenavHeader label="The Prize" icon="Award" />
        <SidenavHeader label="Let It Snow" icon="CloudSnow" />
        <SidenavHeader label="Hello" icon="Settings" />
      </Sidenav>
    </Div>
  </React.Fragment>
)
