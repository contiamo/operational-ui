import styled from "../utils/styled"
import { SectionHeader } from "../Internals/SectionHeader"
import { headerHeight, expandColor } from "../utils/constants"
import { darken } from "../utils"

const buttonWidth = 36
const plusButtonWidth = 42

export const Container = styled.div`
  label: Tabs;
  display: grid;
  grid-template-rows: ${headerHeight}px 1fr;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background.light};
  padding-top: 1px;
`

export const PlusWrapper = styled.div`
  display: flex;
  max-width: 100%;
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
}>`
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  cursor: pointer;
  font-weight: normal;
  background-color: ${({ theme, color }) =>
    color ? darken(expandColor(theme, color)!, 10) : theme.color.background.light};
  border: 1px solid ${({ theme }) => theme.color.separators.default};
  border-radius: 4px 4px 0 0;
  margin: 0;
  margin-right: ${({ last }) => (last ? 0 : -1)}px;
  padding-right: ${({ theme, center }) => (center ? theme.space.element : theme.space.base)}px;
  ${props =>
    props["aria-selected"]
      ? `border-bottom: 1px solid ${expandColor(props.theme, props.color) || props.theme.color.background.lighter}; 
         background-color: ${expandColor(props.theme, props.color) || props.theme.color.background.lighter};
         color: ${props.theme.color.text.action};
         font-weight: bold;
         pointer-events: none;
         :hover {
           background-color: ${expandColor(props.theme, props.color) ||
             props.theme.color.background.lighter} !important;
         }
         & svg {
          color: ${props.theme.color.text.action};
         }
         `
      : ""}

  ${({ condensed }) =>
    condensed ? `max-width: ${buttonWidth}px; min-width: ${buttonWidth}px;` : "max-width: 180px;"}
  flex-grow: 1;
  transition: background-color 0.2s;

  /* Fix the cursor on the "add tab" button */
  & svg {
    ${({ condensed }) => (condensed ? "pointer-events: none;" : "")}
    cursor: pointer;
  }
  :focus {
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
      color ? darken(expandColor(theme, color)!, 20) : theme.color.separators.default};
  }
`

TabHeader.defaultProps = {
  role: "tab",
  as: "button",
}

export const TabButton = styled(SectionHeader, {
  shouldForwardProp: prop => !(prop === "leftMargin" || prop === "as"),
})<{ as?: React.FC<any> | string; transparent?: boolean }>`
  justify-content: center;
  cursor: pointer;
  font-weight: normal;
  background-color: ${({ theme, transparent }) =>
    transparent ? theme.color.background.light : theme.color.background.lighter};
  margin: 0;
  padding: 0;
  width: ${({ transparent }) => (transparent ? plusButtonWidth : buttonWidth)}px;
  min-width: ${({ transparent }) => (transparent ? plusButtonWidth : buttonWidth)}px;
  border: solid ${({ theme }) => theme.color.separators.default};
  border-width: ${({ transparent }) => (transparent ? `0 0 1px 0` : "1px")};
  margin-right: -1px;
  & svg {
    color: ${({ theme }) => theme.color.text.lighter};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.color.background.light};
  }
  &:disabled svg {
    color: ${({ theme }) => theme.color.separators.default};
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
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  margin-top: -1px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background.lighter};
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
  &:hover {
    background: ${({ theme }) => theme.color.separators.default};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  min-width: 32px;
  border-radius: 32px;
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
