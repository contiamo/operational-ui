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
  "& > div": {
    display: "inline-flex"
  }
})

const FormFields = glamorous.div({
  "& > label, & > div": {
    display: "block"
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
          {React.Children.map(
            children,
            (child: React.ReactElement<{ value: string | number; id?: string; label?: string }>, index: number) => {
              return <Chip>{`${child.props.label || child.props.id}: ${child.props.value}`}</Chip>
            }
          )}
          <Chip
            color="#efefef"
            onClick={() => {
              this.setState(prevState => ({
                isExpanded: true
              }))
            }}
            symbol="..."
          >
            Filter
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
            <FormFields>{children}</FormFields>
          </Modal>
        ) : null}
      </Container>
    )
  }
}

export default Filter
