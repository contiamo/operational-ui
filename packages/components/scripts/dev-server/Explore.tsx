import * as React from "react"
import glamorous, { Div } from "glamorous"
import { render } from "react-dom"
import { Theme } from "@operational/theme"
import { OperationalUI, Select, DatePicker, Textarea } from "../../src"

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
  start?: string
  end?: string
}

class Explore extends React.Component<Props, State> {
  state = {
    start: "2018-01-01",
    end: "2018-02-02"
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Container>
          <Textarea label="Textarea label" value="1234" />
        </Container>
      </OperationalUI>
    )
  }
}

export default Explore
