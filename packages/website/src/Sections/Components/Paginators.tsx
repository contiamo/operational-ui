import * as React from "react"
import { Paginator } from "@operational/components"
import * as constants from "../../constants"

export const title = "Paginators"

export const docsUrl = `${constants.docsBaseUrl}/#paginator`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Paginators.tsx`

export interface State {
  page: number
}

export class Component extends React.Component<{}, State> {
  state = {
    page: 2,
  }

  render() {
    return (
      <>
        <Paginator
          page={this.state.page}
          itemCount={345}
          itemsPerPage={100}
          onChange={(page: number) => {
            this.setState(prevState => ({ page }))
          }}
        />
      </>
    )
  }
}
