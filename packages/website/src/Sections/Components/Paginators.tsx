import * as React from "react"
import { Paginator } from "@operational/components"
import * as constants from "../../constants"

export const title = "Paginators"

export const docsUrl = `${constants.docsBaseUrl}/components/paginator.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Paginators.tsx`

export const Component = () => (
  <>
    <Paginator page={2} pageCount={10} />
  </>
)
