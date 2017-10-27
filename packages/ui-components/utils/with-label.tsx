import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../src/theme"

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  display: "inline-block"
}))

const Label = glamorous.label(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.body,
  display: "inline-block",
  marginBottom: theme.spacing / 3
}))

const withLabel = (Component: any): any => {
  return (props: any) => {
    const { id, label } = props
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
    return (
      <Container>
        {props.label && <Label htmlFor={domId}>{props.label}</Label>}
        {props.label && <br />}
        <Component {...props} domId={domId} />
      </Container>
    )
  }
}

export default withLabel
