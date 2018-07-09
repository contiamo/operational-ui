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
    width: (condensed ? 160 : 250) - theme.space.small * 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.color.text.default,
    lineHeight: `${condensed ? 33 : 44}px`,
    padding: `0 ${theme.space.small}px`,
    ...(clickable
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: darken(theme.color.white, 2),
          },
        }
      : {}),
    "&:not(:first-child)": {
      borderTop: "1px solid",
      borderColor: theme.color.separators.default,
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

export default ContextMenuItem
