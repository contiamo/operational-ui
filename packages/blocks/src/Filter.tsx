import * as React from "react"
import glamorous from "glamorous"
import { Chip, Modal, Input, Select, DatePicker } from "@operational/components"
import { Theme } from "@operational/theme"

export interface IProps {
  onClear?: (id: string) => void
  children?: React.ReactNode
}

export interface IState {
  isExpanded: boolean
}

const Container = glamorous.div({
  label: "filter"
})

const FilterBar = glamorous.div({
  "& > div": {
    display: "inline-flex"
  }
})

const FormFields = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > label, & > div": {
    margin: `${theme.spacing}px 0`,
    display: "block"
  }
}))

class Filter extends React.Component<IProps, IState> {
  state: IState = {
    isExpanded: false
  }

  render() {
    return (
      <Container>
        <FilterBar>
          {React.Children.map(
            this.props.children,
            (
              child: React.ReactElement<{
                id: string
                start?: string
                end?: string
                value?: string | number
                label?: string
              }>,
              index: number
            ) => {
              if (!child.props.start && !child.props.end && !child.props.value) {
                return null
              }
              const label = child.props.label || child.props.id
              let value = ""
              switch (child.type) {
                case Input:
                  value = !!child.props.value || child.props.value === 0 ? String(child.props.value) : ""
                  break
                case Select:
                  value = !!child.props.value || child.props.value === 0 ? String(child.props.value) : ""
                  break
                case DatePicker:
                  value = [child.props.start, child.props.end].filter(date => !!date).join(" - ")
                  break
              }
              if (value === "") {
                value = "..."
              }
              return (
                <Chip
                  onIconClick={
                    this.props.onClear
                      ? () => {
                          this.props.onClear(child.props.id)
                        }
                      : null
                  }
                  icon="X"
                >{`${label}: ${value}`}</Chip>
              )
            }
          )}
          <Chip
            color="#efefef"
            onIconClick={() => {
              this.setState(prevState => ({
                isExpanded: true
              }))
            }}
            icon="Plus"
          >
            Add filter
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
            <FormFields>{this.props.children}</FormFields>
          </Modal>
        ) : null}
      </Container>
    )
  }
}

export default Filter
