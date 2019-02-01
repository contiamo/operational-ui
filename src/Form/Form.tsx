import * as React from "react"

import { isCmdEnter } from "../utils"
import styled from "../utils/styled"

const Container = styled("form")(({ theme }) => ({
  // Space between groups
  "> :not(:last-child)": {
    marginBottom: 34 - theme.space.small,
    display: "block",
  },

  // Space between children _inside_ groups
  "> :not(:last-child) > *": {
    marginBottom: theme.space.small,
  },
  "> * > *:not(:last-child)": {
    marginRight: theme.space.small,
  },
}))

const Form: React.SFC<React.FormHTMLAttributes<{}>> = props => (
  <Container
    {...props}
    onKeyDown={(ev: React.KeyboardEvent<HTMLFormElement>) => {
      if (isCmdEnter(ev) && props.onSubmit) {
        props.onSubmit(ev)
      }
    }}
  />
)

export default Form
