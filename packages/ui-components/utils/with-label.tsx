import * as React from "react"
import glamorous from "glamorous"

const Label = glamorous.label(({ theme }: { theme: Theme }) => ({
  "& > span": {
    ...theme.typography.body,
    display: "inline-block",
    marginBottom: theme.spacing / 3
  }
}))

const withLabel = (Component: any): any => {
  return (props: any) => {
    const { id, label } = props
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
    return (
      <Label htmlFor={domId}>
        {props.label && <span>{props.label}</span>}
        {props.label && <br />}
        <Component {...props} domId={domId} />
      </Label>
    )
  }
}

export default withLabel
