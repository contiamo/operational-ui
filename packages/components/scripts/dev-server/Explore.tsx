import * as React from "react"
import glamorous, { Div } from "glamorous"
import { render } from "react-dom"
import { Theme } from "@operational/theme"
import { OperationalUI, Select, TimelineItem } from "../../src"

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: theme.spacing,
  maxWidth: 640,
  margin: "auto",
  "& h1": {
    ...theme.typography.title
  }
}))

export interface Props {}

export interface State {
  value: string[]
}

class Explore extends React.Component<Props, State> {
  state = {
    value: ["123"]
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Container>
          <Select
            value={this.state.value}
            options={[{ value: "123", label: "321" }, { value: "456" }]}
            onChange={newVal => {
              this.setState(prevState => ({
                value: newVal as string[]
              }))
            }}
          />
        </Container>
      </OperationalUI>
    )
  }
}

export default Explore
