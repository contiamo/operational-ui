import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { darken } from "../utils"

export interface Props {
  condensed?: boolean
  width?: number
  onClick?: () => void
}

const Container = styled("div")(
  ({
    theme,
    onClick,
    condensed,
    width,
  }: {
    theme?: OperationalStyleConstants
    onClick?: () => void
    condensed: Props["condensed"]
    width?: Props["width"]
  }) => ({
    userSelect: "none",
    label: "contextmenuitem",
    width: width || (condensed ? 160 : 250),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.color.text.default,
    lineHeight: `${condensed ? 33 : 44}px`,
    backgroundColor: theme.color.white,
    padding: `0 ${theme.space.content}px`,
    ...(!!onClick
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: darken(theme.color.white, 2),
          },
        }
      : {
          cursor: "default",
        }),
    "&:not(:first-child)": {
      borderTop: "1px solid",
      borderColor: theme.color.separators.default,
    },
  }),
)

const ContextMenuItem: React.SFC<Props> = props => (
  <Container {...props} condensed={props.condensed}>
    {props.children}
  </Container>
)

export default ContextMenuItem
