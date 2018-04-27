import * as React from "react"
import { Paginator } from "@operational/components"

export const title = "Paginators"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/paginator.md"

export const Component = () => (
  <React.Fragment>
    <Paginator page={2} pageCount={10} />
  </React.Fragment>
)
