import styled from "../utils/styled"
import { dataTableActionContainerSize } from "../DataTable/DataTable.styled"

export const Container = styled.div<{ hasIcon: boolean }>`
  display: grid;

  /**
   * The columns are: type, name, "see more" icon, and caret for icons
   */
  grid-template-columns: ${({ hasIcon }) =>
    hasIcon
      ? `${dataTableActionContainerSize}px auto ${dataTableActionContainerSize}px ${dataTableActionContainerSize}px`
      : `auto ${dataTableActionContainerSize}px ${dataTableActionContainerSize}px`};
  width: calc(100% + ${({ theme }) => theme.space.content * 2}px);
  height: 100%;
  margin: 0 -${({ theme }) => theme.space.content}px;
  align-items: center;
  padding-left: ${({ hasIcon, theme }) => (hasIcon ? 0 : theme.space.content)}px;
  grid-column: 1 / span 2;
`

export const TitleContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
`
export const GhostTitleContainer = styled.div<{ hasIcon: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ theme, hasIcon }) => (hasIcon ? dataTableActionContainerSize : theme.space.content)}px;
  visibility: hidden;
  pointer-events: none;
  white-space: pre;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: stretch;
  margin: auto;
  width: 100%;
  height: 100%;

  /* The ContextMenu */
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`
