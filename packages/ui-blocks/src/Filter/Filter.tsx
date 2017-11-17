import * as React from "react"
import glamorous from "glamorous"

import { Chip, Modal, Select } from "contiamo-ui-components"

export interface IProps {
  children?: React.ReactNode
}

export interface IState {
  isExpanded: boolean
}

const Container = glamorous.div({})

const FilterBar = glamorous.div({
  "& > *": {
    display: "inline-block"
  }
})

class Filter extends React.Component<IProps, IState> {
  state: IState = {
    isExpanded: false
  }

  render() {
    const { children } = this.props
    return (
      <Container>
        <FilterBar>
          {React.Children.map(children, (child: React.ReactElement<{ value: string | number }>, index: number) => {
            return <Chip>{String(child.props.value)}</Chip>
          })}
          <Chip
            onClick={() => {
              this.setState(prevState => ({
                isExpanded: true
              }))
            }}
          >
            ...
          </Chip>
        </FilterBar>
        {this.state.isExpanded ? (
          <Modal
            onClose={() => {
              this.setState(prevState => ({
                isExpanded: false
              }))
            }}
          >
            {children}
          </Modal>
        ) : null}
      </Container>
    )
  }
}

export default Filter
