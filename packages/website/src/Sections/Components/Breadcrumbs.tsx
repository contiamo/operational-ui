import * as React from "react"
import { Breadcrumbs, Breadcrumb } from "@operational/components"

export const title = "Breadcrumbs"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/breadcrumb.md"

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
