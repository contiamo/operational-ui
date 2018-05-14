import * as React from "react"
import { Breadcrumbs, Breadcrumb } from "@operational/components"
import * as constants from "../../constants"

export const title = "Breadcrumbs"

export const docsUrl = `${constants.docsBaseUrl}/components/breadcrumb.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Breadcrumbs.tsx`

export const Component = () => (
  <Breadcrumbs>
    <Breadcrumb>
      <a>Link one</a>
    </Breadcrumb>
    <Breadcrumb>
      <a>Link two</a>
    </Breadcrumb>
    <Breadcrumb>Link three</Breadcrumb>
  </Breadcrumbs>
)
