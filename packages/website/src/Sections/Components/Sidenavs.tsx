import * as React from "react"
import { Div } from "glamorous"
import { Sidenav, SidenavHeader } from "@operational/components"
import * as constants from "../../constants"

export const title = "Sidenavs"

export const docsUrl = `${constants.docsBaseUrl}/components/sidenav.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Sidenavs.tsx`

export const Component = () => (
  <>
    <Div css={{ height: 220 }}>
      <Sidenav expanded>
        <SidenavHeader label="The Prize" icon="Award" />
        <SidenavHeader label="Let It Snow" icon="CloudSnow" />
        <SidenavHeader label="Hello" icon="Settings" />
      </Sidenav>
    </Div>
  </>
)
