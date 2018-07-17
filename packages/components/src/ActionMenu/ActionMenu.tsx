import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import ContextMenu, { Props as ContextMenuProps } from "../ContextMenu/ContextMenu"
import Icon from "../Icon/Icon"

export interface Props {
  /** Action when item in dropdown is selected - if specified here, it is applied to all dropdown items */
  onClick?: ContextMenuProps["onClick"]
  /** Title */
  title?: string
  /** Actions to display in dropdown */
  items: ContextMenuProps["items"]
}

const Container = styled("div")(({ theme, isOpen }: { theme?: OperationalStyleConstants; isOpen: boolean }) => ({
  width: 144,
  height: 35,
  padding: `0 ${theme.space.content}px`,
  backgroundColor: theme.color.white,
  ...(isOpen
    ? {
        boxShadow: `0 3px 12px ${theme.color.border.disabled}`,
        borderColor: `${theme.color.separators.light} ${theme.color.white}`,
        borderWidth: "1px",
        borderStyle: "solid",
      }
    : {
        border: `1px solid ${theme.color.separators.light}`,
      }),
  color: theme.color.primary,
  fontWeight: theme.font.weight.medium,
  borderRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const TitleContainer = styled("p")({
  width: 90,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const ActionMenu: React.SFC<Props> = (props: Props) => {
  return (
    <ContextMenu {...props} items={props.items} width={144} condensed>
      {isOpen => (
        <Container isOpen={isOpen}>
          <TitleContainer>{props.title}</TitleContainer>
          <Icon name={isOpen ? "ChevronUp" : "Menu"} />
        </Container>
      )}
    </ContextMenu>
  )
}

ActionMenu.defaultProps = {
  title: "Actions",
}

export default ActionMenu
