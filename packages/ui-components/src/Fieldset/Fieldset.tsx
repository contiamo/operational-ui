import * as React from "react"
import glamorous from "glamorous"

interface IProps {
  css?: any
  className?: string
  children?: React.ReactNode
  legend: string
}

const Container = glamorous.fieldset(({ theme }: { theme: Theme }): any => ({
  padding: 0,
  border: 0,
  "& > *:not(legend)": {
    display: "block",
    marginTop: theme.spacing,
    marginBottom: theme.spacing
  }
}))

const Legend = glamorous.legend(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.heading1
}))

const Fieldset = ({ children, legend }: IProps) => (
  <Container>
    <Legend>{legend}</Legend>
    {children}
  </Container>
)

export default Fieldset
