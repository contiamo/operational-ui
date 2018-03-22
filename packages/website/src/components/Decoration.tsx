import * as React from "react"
import glamorous from "glamorous"

export const CornerAngle = (props: {}) => (
  <glamorous.Div
    css={{
      position: "relative"
    }}
  >
    <glamorous.Div
      css={{
        width: 30,
        height: 30,
        borderBottomRightRadius: 3,
        borderRight: "2px solid",
        borderBottom: "2px solid",
        borderColor: "#898989",
        position: "absolute",
        right: 0,
        bottom: 0,
        stroke: "black",
        strokeWidth: 2
      }}
    />
  </glamorous.Div>
)
