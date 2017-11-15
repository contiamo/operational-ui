import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  key?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
  legend: string
}

const Container = glamorous.fieldset(({ theme }: { theme: Theme }): any => ({
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

const Fieldset = ({ css, className, key, children, legend }: IProps) => (
  <Container css={css} className={className} key={key}>
    <Legend>{legend}</Legend>
    {children}
  </Container>
)

export default Fieldset
