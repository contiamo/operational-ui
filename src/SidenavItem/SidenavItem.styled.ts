import styled from "../utils/styled"

export const compactSidenavItemHeight = 84

export const StyledSidenavItem = styled("div", {
  shouldForwardProp: prop =>
    !["isDark", "hasIcon", "hasItems", "compact", "hasOnClick", "as", "end", "isActive"].includes(prop),
})<{
  as: "a" | "div"
  end: boolean
  isActive: boolean
  isDark: boolean
  compact: boolean
  hasIcon: boolean
  hasItems: boolean
  hasOnClick: boolean
}>`
  position: relative;
  display: grid;
  grid-template-rows: ${({ compact }) => (compact ? "40px min-content" : "auto")};
  text-align: ${({ compact }) => (compact ? "center" : "initial")};
  align-items: center;
  padding: ${({ theme }) => theme.space.content}px;
  font-size: ${({ theme, compact }) => (compact ? theme.font.size.tiny : theme.font.size.body)}px;
  min-height: ${({ compact }) => (compact ? compactSidenavItemHeight : 48)}px;
  width: 100%;
  background: ${({ theme, isActive, isDark }) =>
    isActive ? theme.color.white : isDark ? theme.color.primaryDark : theme.color.white};
  color: ${({ theme, isActive, isDark }) =>
    isActive ? theme.color.primary : isDark ? theme.color.white : theme.color.text.default};
  margin-top: ${({ end }) => (end ? "auto" : "0px")};
  cursor: ${({ hasOnClick }) => (hasOnClick ? "pointer" : "initial")};
  grid-template-columns: ${({ hasItems, hasIcon, compact }) => {
    if (!compact) {
      if (hasIcon && hasItems) {
        return "40px auto 40px"
      }
      if (hasIcon && !hasItems) {
        return "40px auto"
      }
      if (!hasIcon && hasItems) {
        return "auto 40px"
      }
      return "auto"
    }
  }};

  :link,
  :visited {
    color: ${({ theme, isActive, isDark }) =>
      isActive ? theme.color.primary : isDark ? theme.color.white : theme.color.text.default};
    cursor: pointer;
  }

  :hover,
  :focus {
    background: ${({ theme, isActive, isDark }) =>
      isActive ? theme.color.white : isDark ? theme.color.black : theme.color.background.lightest};
  }

  > svg {
    pointer-events: none;
  }
`

export const Caret = styled("div")<{ isOpen: boolean }>`
  width: 0;
  height: 0;
  margin-left: auto;
  border: 4px solid transparent;
  border-left-color: ${({ theme, isOpen }) => (isOpen ? theme.color.primary : theme.color.white)};
`

export const IconContainer = styled("div")<{ compact: boolean }>`
  margin-left: ${({ compact }) => (compact ? "auto" : 0)};
  margin-right: ${({ compact }) => (compact ? "auto" : 0)};
`
