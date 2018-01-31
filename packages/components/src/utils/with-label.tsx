import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block"
}))

const Label = glamorous.label(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.small,
  fontWeight: 600,
  opacity: 0.7,
  display: "inline-block",
  marginBottom: theme.spacing / 4
}))

const withLabel = (Component: any): any => {
  return (props: any) => {
    const { id, label } = props
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
    return (
      <Container className={props.className} css={props.css}>
        {props.label && <Label htmlFor={domId}>{props.label}</Label>}
        {props.label && <br />}
        <Component {...props} domId={domId} />
      </Container>
    )
  }
}

export default withLabel
