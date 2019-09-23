import * as React from "react"
import { createPortal } from "react-dom"
import noop from "lodash/noop"

import { ActionsContainer, Container, TitleContainer, GhostTitleContainer } from "./DataTableHeader.styled"
import { IconComponentType, DotMenuHorizontalIcon, ChevronDownIcon } from "../Icon"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import isString from "lodash/isString"
import { ViewMorePopup } from "../DataTable/DataTable.styled"
import useViewMore from "../DataTable/useViewMore"
import ContextMenu from "../ContextMenu/ContextMenu"
import useWindowSize from "../useWindowSize"

export interface DataTableHeaderProps {
  title: React.ReactNode
  icon?: IconComponentType
  actions?: IContextMenuItem[]
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ icon: Icon, actions, title }) => {
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
      <Container hasIcon={Boolean(Icon)}>
        {Icon && <Icon color="primary" style={{ margin: "auto" /* for centering */ }} size={12} />}
        <TitleContainer ref={$title}>{title}</TitleContainer>
        <GhostTitleContainer hasIcon={Boolean(Icon)} ref={$ghostTitle}>
          {title}
        </GhostTitleContainer>
        {isTitleOverflowing ? (
          <DotMenuHorizontalIcon
            style={{ margin: "auto" }}
            onMouseEnter={isString(title) ? open(title) : noop}
            onMouseLeave={close}
            color="color.text.lighter"
            size={20}
          />
        ) : (
          <div /> // Just to fill the grid column with emptiness and use the next one.
        )}
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
