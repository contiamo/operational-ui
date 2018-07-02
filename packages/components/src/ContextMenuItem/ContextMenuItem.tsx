import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  children?: any
  onClick?: () => void
  __isContextMenuItem?: boolean
}

const Container = styled("div")(
  ({ theme, clickable }: { theme?: OperationalStyleConstants; clickable: boolean }): any => ({
    label: "contextmenuitem",
    backgroundColor: theme.deprecated.colors.white,
    minWidth: 160,
    width: "fit-content",
    padding: `${theme.deprecated.spacing / 2}px ${theme.deprecated.spacing}px`,
    border: "1px solid",
    borderColor: theme.deprecated.colors.separator,
    ...(clickable
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: darken(theme.deprecated.colors.white, 2),
          },
        }
      : {}),
    "&:not(:first-child)": {
      borderTop: 0,
    },
  }),
)

const ContextMenuItem: React.SFC<Props> = (props: Props) => (
  <Container id={props.id} className={props.className} clickable={!!props.onClick} onClick={props.onClick}>
    {props.children}
  </Container>
)

ContextMenuItem.defaultProps = {
  __isContextMenuItem: true,
}

export default ContextMenuItem
