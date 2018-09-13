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
}))

/**
 * The `any` type variable is required to allow the `isCmdEnter` method
 * to be re-used across different node types (both `HTMLFormElement` and `HTMLElement`
 * cause issues here).
 */
const Form: React.SFC<typeof Container> = (props: React.HTMLProps<any>) => (
  <Container
    {...props}
    onKeyDown={(ev: React.KeyboardEvent<any>) => {
      if (isCmdEnter(ev) && props.onSubmit) {
        props.onSubmit(ev)
      }
    }}
  />
)

export default Form
