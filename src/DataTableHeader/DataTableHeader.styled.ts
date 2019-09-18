import styled from "../utils/styled"

export const Container = styled.div<{ hasIcon: boolean }>`
  display: grid;

  /**
   * The columns are: type, name, "see more" icon, and caret for icons
   */
  grid-template-columns: ${({ hasIcon }) => (hasIcon ? `36px auto 36px 36px` : `auto 36px 36px`)};
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
