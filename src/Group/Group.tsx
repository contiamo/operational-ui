import * as React from "react"

import Icon, { IconName } from "../Icon/Icon"
import Body from "../Typography/Body"
import styled from "../utils/styled"

interface GroupBaseProps {
  /** What is the title of this group? */
  title?: string
  /** Is the group collapsed? */
  collapsed?: boolean
  /** How high should the group be? */
  minHeight?: number
  /** Which icon do we associate with this group? */
  icon?: IconName
}

interface GroupPropsWithIcon extends GroupBaseProps {
  /** Which icon do we associate with this group? */
  icon: IconName
  /** What color would we like the icon to be? */
  iconColor?: string
}

interface GroupPropsWithoutIcon extends GroupBaseProps {
  /** Which icon do we associate with this group? */
  icon?: never
  /** What color would we like the icon to be? */
  iconColor?: never
}

export type GroupProps = GroupPropsWithIcon | GroupPropsWithoutIcon

const headerHeight = 43

const Container = styled("div")<{ collapsed: boolean; minHeight: number }>`
  background-color: ${({ theme }) => theme.color.background.lighter};
  border: 1px solid ${({ theme }) => theme.color.border.disabled};
  padding: ${({ theme }) => theme.space.medium}px;
  min-height: ${({ collapsed, minHeight }) => (collapsed ? 0 : `${minHeight}px`)};
  height: ${({ collapsed }) => (collapsed ? `${headerHeight}px` : "auto")};
`

const Header = styled("div")<{ collapsed: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  padding: ${({ theme }) => theme.space.medium}px;
  margin: ${({ theme }) => theme.space.medium * -1}px;
  margin-bottom: ${({ theme, collapsed }) => (collapsed ? 0 : `${theme.space.element}px`)};
  height: ${headerHeight}px; /* in order to prevent browsers from guessing */
`

const HeaderText = styled(Body)<{ hasIcon: boolean }>`
  margin: 0 0 0 ${({ theme, hasIcon }) => (hasIcon ? theme.space.content : 0)}px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.color.text.lighter};
`

const Group: React.SFC<GroupProps> = ({ title, icon, iconColor, children, collapsed, minHeight }) => (
  <Container minHeight={minHeight!} collapsed={Boolean(collapsed)}>
    {(title || icon) && (
      <Header collapsed={Boolean(collapsed)}>
        {icon && <Icon color={iconColor} name={icon} />} <HeaderText hasIcon={Boolean(icon)}>{title}</HeaderText>
      </Header>
    )}
    {collapsed === false && children}
  </Container>
)

Group.defaultProps = {
  collapsed: false,
  minHeight: 0,
}

export default Group
