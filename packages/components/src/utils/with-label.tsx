import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "./constants"

const Container = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  display: "inline-block",
}))

const Label = styled("label")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  ...theme.deprecated.typography.small,
  fontWeight: theme.font.weight.bold,
  opacity: 0.7,
  display: "inline-block",
  marginBottom: theme.deprecated.spacing / 4,
}))

function withLabel<T extends Pick<React.HTMLProps<HTMLDivElement>, "className" | "label" | "id">>(
  Component: React.ComponentType<T>,
): React.SFC<T> {
  return (props: T) => {
    const { id, label } = props
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
    return (
      <Container className={props.className}>
        {props.label && <Label htmlFor={domId}>{props.label}</Label>}
        {props.label && <br />}
        <Component {...props} id={domId} />
      </Container>
    )
  }
}

export default withLabel
