import * as React from "react"

import { Chip } from "contiamo-ui-components"

export interface IProps {
  children?: React.ReactNode
}

class Filter extends React.Component<IProps, {}> {
  render() {
    const { children } = this.props
    return (
      <div>
        <Chip>{"Testfilter = 2"}</Chip>
        {children}
      </div>
    )
  }
}

export default Filter
