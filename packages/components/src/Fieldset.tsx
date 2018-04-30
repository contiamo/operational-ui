import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string
  css?: any
  className?: string
  children?: React.ReactNode
  legend: string
}

const Container = glamorous.fieldset(({ theme }: { theme: Theme }): any => ({
  label: "fieldset",
  verticalAlign: "top",
  padding: 0,
  border: 0,
  margin: `${theme.spacing}px 0 ${theme.spacing / 2}px`,
  breakInside: "avoid-column",
  "& > *:not(legend)": {
    display: "block",
    marginTop: theme.spacing,
    marginBottom: theme.spacing
  },
  "&:first-child": {
    marginTop: 0
  }
}))

const Legend = glamorous.legend(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.heading1,
  paddingLeft: 0
}))

const Fieldset = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    <Legend>{props.legend}</Legend>
    {props.children}
  </Container>
)

export default Fieldset
