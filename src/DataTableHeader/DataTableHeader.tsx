import * as React from "react"
import { createPortal } from "react-dom"
import noop from "lodash/noop"

import { ActionsContainer, Container, TitleContainer, GhostTitleContainer } from "./DataTableHeader.styled"
import { IconComponentType, ChevronDownIcon } from "../Icon"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import isString from "lodash/isString"
import { ViewMorePopup } from "../DataTable/DataTable.styled"
import useViewMore from "../DataTable/useViewMore"
import ContextMenu from "../ContextMenu/ContextMenu"
import useWindowSize from "../useWindowSize"

export interface DataTableHeaderProps {
  title: React.ReactNode
  icon?:
    | IconComponentType
    | {
        left?: IconComponentType
        right?: IconComponentType
      }
  actions?: IContextMenuItem[]
}

const isIcon = (icon: any): icon is IconComponentType => {
  return typeof icon === "function"
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ icon, actions, title }) => {
  const LeftIcon = icon && (isIcon(icon) ? icon : icon.left)
  const RightIcon = icon && !isIcon(icon) && icon.right
  const $title = React.useRef<HTMLDivElement>(null)
  const $ghostTitle = React.useRef<HTMLDivElement>(null)
  const [isTitleOverflowing, setIsTitleOverflowing] = React.useState(false)
  const { open, close, viewMorePopup } = useViewMore()
  const { width } = useWindowSize()

  React.useLayoutEffect(() => {
    const currentTitle = $title.current
    const ghostTitle = $ghostTitle.current

    if (!currentTitle) {
      return
    }

    if (!ghostTitle) {
      return
    }

    setIsTitleOverflowing(
      isString(title) && currentTitle.getBoundingClientRect().width < ghostTitle.getBoundingClientRect().width,
    )
  }, [width])

  return (
    <>
      <Container hasIcon={Boolean(LeftIcon)}>
        {LeftIcon && <LeftIcon color="primary" style={{ margin: "auto" /* for centering */ }} size={12} />}
        {isTitleOverflowing ? (
          <TitleContainer onMouseEnter={isString(title) ? open(title) : noop} onMouseLeave={close} ref={$title}>
            {title}
          </TitleContainer>
        ) : (
          <TitleContainer ref={$title}>{title}</TitleContainer>
        )}
        <GhostTitleContainer hasIcon={Boolean(LeftIcon)} ref={$ghostTitle}>
          {title}
        </GhostTitleContainer>
        {RightIcon ? <RightIcon color="primary" style={{ margin: "auto" /* for centering */ }} size={12} /> : <div />}
        {actions && (
          <ActionsContainer>
            <ContextMenu items={actions}>
              <ChevronDownIcon color="color.text.lighter" size={20} onClick={noop} />
            </ContextMenu>
          </ActionsContainer>
        )}
      </Container>

      {/**
       * Portals because position: sticky; support is sketchy.
       * We render the popup _just_ before </body>.
       */}
      {viewMorePopup &&
        createPortal(
          <ViewMorePopup top={viewMorePopup.y} left={viewMorePopup.x}>
            {viewMorePopup.content}
          </ViewMorePopup>,
          document.body,
        )}
    </>
  )
}

export default DataTableHeader
