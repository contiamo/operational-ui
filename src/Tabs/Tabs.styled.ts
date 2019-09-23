import styled from "../utils/styled"
import { SectionHeader } from "../Internals/SectionHeader"
import { headerHeight, expandColor } from "../utils/constants"
import { lighten } from "../utils"

const buttonWidth = 36
const tabWidth = 194
const plusButtonWidth = 42

export const Container = styled.div`
  label: Tabs;
  display: grid;
  grid-template-rows: ${headerHeight}px 1fr;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background.lighter};
  padding-top: 2px;
`

export const PlusWrapper = styled.div`
  display: flex;
  overflow: hidden;
`

export const TabList = styled.div<{ scroll: boolean }>`
  display: flex;
  overflow-x: auto;
  /* + 1px to compensate right: -1px in ScrollButtons */
  max-width: ${({ scroll }) => (scroll ? `calc(100% - ${buttonWidth * 2}px - ${plusButtonWidth}px - 1px)` : "none")};
  scroll-behavior: smooth;
  overflow-y: hidden;
  /* magic number to hide scroll bar underneath tabpanel */
  height: ${headerHeight + 20}px;
  -webkit-overflow-scrolling: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 1;
`

TabList.defaultProps = {
  role: "tablist",
}

export const TabScroll = styled.div`
  display: flex;
  width: 100%;
`

export const TabHeader = styled(SectionHeader, {
  shouldForwardProp: prop =>
    !(prop === "center" || prop === "aria-selected" || prop === "condensed" || prop === "as" || prop === "last"),
})<{
  "aria-selected": boolean
  condensed?: boolean
  as?: React.FC<any> | string
  center?: boolean
  color?: string
  last?: boolean
  size: "fixed" | "flex"
}>`
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  cursor: pointer;
  font-weight: normal;
  background-color: ${({ theme, color }) => (color ? expandColor(theme, color)! : theme.color.border.medium)};
  border: none;
  border-radius: 4px 4px 0 0;
  margin: 0 1px;
  padding-right: ${({ theme, center }) => (center ? theme.space.element : theme.space.base)}px;
  ${props =>
    props["aria-selected"]
      ? `border-bottom: none; 
         background-color: ${expandColor(props.theme, props.color) || props.theme.color.white};
         color: ${props.theme.color.text.action};
         font-weight: bold;
         :hover {
           background-color: ${expandColor(props.theme, props.color) || props.theme.color.white} !important;
         }
         & svg {
          color: ${props.theme.color.text.action};
         }
         `
      : ""}

  ${({ condensed }) => (condensed ? `max-width: ${buttonWidth}px; min-width: ${buttonWidth}px;` : "max-width: 180px;")}
  ${({ size }) => (size === "fixed" ? `flex: 0 0 ${tabWidth}px; width: ${tabWidth}px;` : "flex: 1 0;")};
  transition: background-color 0.2s;

  /* Fix the cursor on the "add tab" button */
  & svg {
    ${({ condensed }) => (condensed ? "pointer-events: none;" : "")}
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  ::-moz-focus-inner {
    border: none;
  }
  :disabled {
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }
  :hover {
    background-color: ${({ theme, color }) =>
      color ? lighten(expandColor(theme, color)!, 2) : theme.color.background.lightest};
  }
`

TabHeader.defaultProps = {
  role: "tab",
  as: "button",
}

export const TabButton = styled(SectionHeader, {
  shouldForwardProp: prop => !(prop === "leftMargin" || prop === "as" || prop === "isPlusButton"),
})<{ as?: React.FC<any> | string; isPlusButton?: boolean; disabled?: boolean }>`
  justify-content: center;
  cursor: pointer;
  font-weight: normal;
  background-color: ${({ theme }) => theme.color.background.lighter};
  margin: 0;
  padding: 0;
  width: ${({ isPlusButton }) => (isPlusButton ? plusButtonWidth : buttonWidth)}px;
  min-width: ${({ isPlusButton }) => (isPlusButton ? plusButtonWidth : buttonWidth)}px;
  border: none;
  border-width: ${({ isPlusButton }) => (isPlusButton ? `0 0 1px 0` : "1px")};
  & svg {
    color: ${({ theme }) => theme.color.text.lighter};
  }
  &:disabled,
  &:disabled svg,
  &:disabled span {
    background-color: ${({ theme }) => theme.color.background.lighter};
    cursor: default !important;
  }
  &:focus {
    outline: none;
  }
`

TabButton.defaultProps = {
  as: "button",
  "aria-hidden": true,
  tabIndex: -1,
}

export const TabContainer = styled.div`
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.white};
`

export const TabPanel = styled.div`
  z-index: 2;
  :focus {
    outline: none;
  }
  ::-moz-focus-inner {
    border: none;
  }
  height: 100%;
  overflow: auto;
  background-color: ${({ theme, color }) => expandColor(theme, color)};
`

TabPanel.defaultProps = {
  role: "tabpanel",
  tabIndex: 0,
}

// We need this one so that icon and title both would be aligned to the left
export const TitleIconWrapper = styled.div`
  display: flex;
  max-width: 120px;
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.space.base}px;
`

// we need this one to show ellipsis if title is to long
export const TitleWrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const TabIcon = styled.span`
  margin-right: ${({ theme }) => theme.space.small}px;
  pointer-events: none;
`

export const IconButton = styled.span`
  pointer-events: all;
  transition: background-color 0.2s;
  :hover {
    background: ${({ theme }) => theme.color.separators.default};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  min-width: 24px;
  border-radius: 24px;
  & svg {
    color: ${({ theme }) => theme.color.text.default} !important;
    cursor: pointer !important;
  }
`

export const ScrollButtons = styled.div`
  position: absolute;
  top: 1px;
  right: -1px;
  width: ${buttonWidth * 2}px;
  display: flex;
  z-index: 1;
`
