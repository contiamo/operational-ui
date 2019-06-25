import styled from "../utils/styled"
import { SectionHeader } from "../Internals/SectionHeader"

const buttonWidth = 55

export const Container = styled.div`
  label: Tabs;
  display: grid;
  grid-template-rows: 36px 1fr;
  position: relative;
  height: 100%;
`

export const TabList = styled.div<{ scroll: boolean }>`
  display: flex;
  overflow-x: auto;
  max-width: ${({ scroll }) => (scroll ? `calc(100% - ${buttonWidth * 2}px)` : "none")};
  scroll-behavior: smooth;
  border-left: solid 1px ${({ theme }) => theme.color.separators.default};
  overflow-y: hidden;
  /* magic number to hide scroll bar underneath tabpanel */
  height: 56px;
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
    !(prop === "first" || prop === "center" || prop === "aria-selected" || prop === "condensed" || prop === "as"),
})<{
  first: boolean
  "aria-selected": boolean
  condensed?: boolean
  as?: React.FC<any> | string
  center?: boolean
}>`
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  cursor: pointer;
  font-weight: normal;
  background-color: ${({ theme }) => theme.color.background.light};
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  border-left: none;
  ${props =>
    props["aria-selected"]
      ? `border-bottom: 1px solid ${props.theme.color.background.lighter}; 
         background-color: ${props.theme.color.background.lighter};
         color: ${props.theme.color.text.dark};
         font-weight: bold;`
      : ""}

  ${({ condensed }) =>
    condensed ? `max-width: ${buttonWidth}px; min-width: ${buttonWidth}px;` : "max-width: 180px;"}
  flex-grow: 1;
  & svg {
    ${({ condensed }) => (condensed ? "pointer-events: none;" : "")}
    cursor: pointer;
  }
  :focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.insetFocus};
  }
  ::-moz-focus-inner {
    border: none;
  }
  :disabled {
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }
  margin: 0;
`

TabHeader.defaultProps = {
  role: "tab",
  as: "button",
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
`

export const ScrollButtons = styled.div`
  position: absolute;
  right: 1px;
  width: ${buttonWidth * 2}px;
  display: flex;
  border-left: solid 1px ${({ theme }) => theme.color.separators.default};
  border-right: solid 1px ${({ theme }) => theme.color.separators.default};
  z-index: 1;
`
