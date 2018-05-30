import * as React from "react"
import { Div } from "glamorous"
import { Sidenav, SidenavHeader, SidenavItem } from "@operational/components"
import * as constants from "../../constants"

export const title = "Sidenavs"

export const docsUrl = `${constants.docsBaseUrl}/#sidenav`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Sidenavs.tsx`

export const Component = () => (
  <>
    <Div css={{ height: 400 }}>
      <Sidenav expanded>
        <SidenavHeader active label="The Prize" icon="Award">
          <SidenavItem label="The First Prize" />
          <SidenavItem label="The First Prize" />
          <SidenavItem label="The First Prize" />
        </SidenavHeader>
        <SidenavHeader label="Let It Snow" icon="CloudSnow" />
        <SidenavHeader label="Hello" icon="Settings" />
      </Sidenav>
    </Div>
  </>
)
