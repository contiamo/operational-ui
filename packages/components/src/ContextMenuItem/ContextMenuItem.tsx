import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  children?: any
  condensed?: boolean
  onClick?: () => void
  __isContextMenuItem?: boolean
}

const Container = styled("div")(
  ({
    theme,
    clickable,
    condensed,
  }: {
    theme?: OperationalStyleConstants
    clickable: boolean
    condensed: boolean
  }): any => ({
    label: "contextmenuitem",
    backgroundColor: theme.color.white,
    minWidth: condensed ? 160 : 250,
    lineHeight: `${condensed ? 33 : 44}px`,
    width: "fit-content",
    padding: `0 ${theme.space.content}px`,
    border: "1px solid",
    borderColor: theme.color.separators.default,
    ...(clickable
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: darken(theme.color.white, 2),
          },
        }
      : {}),
    "&:not(:first-child)": {
      borderTop: 0,
    },
  }),
)

const ContextMenuItem: React.SFC<Props> = (props: Props) => (
  <Container
    id={props.id}
    className={props.className}
    clickable={!!props.onClick}
    onClick={props.onClick}
    condensed={props.condensed}
  >
    {props.children}
  </Container>
)

ContextMenuItem.defaultProps = {
  __isContextMenuItem: true,
}

export default ContextMenuItem
