import * as React from "react"
import { createPortal } from "react-dom"
import noop from "lodash/noop"

import { ActionsContainer, Container, TitleContainer } from "./DataTableHeader.styled"
import { IconComponentType, DotMenuHorizontalIcon, ChevronDownIcon } from "../Icon"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import isString = require("lodash/isString")
import { ViewMorePopup } from "../DataTable/DataTable.styled"
import useViewMore from "../DataTable/useViewMore"
import ContextMenu from "../ContextMenu/ContextMenu"

export interface BaseDataTableHeaderProps {
  title: React.ReactNode
  icon?: IconComponentType
}

export interface DataTableHeaderPropsWithoutActions extends BaseDataTableHeaderProps {
  actions?: never
  onPerformAction?: never
}

export interface DataTableHeaderPropsWithActions extends BaseDataTableHeaderProps {
  actions: IContextMenuItem[]
  onPerformAction: (action: IContextMenuItem) => void
}

type DataTableHeaderProps = DataTableHeaderPropsWithoutActions | DataTableHeaderPropsWithActions

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ icon: Icon, actions, title }) => {
  const titleGlyphSize = 8
  const $title = React.useRef<HTMLDivElement>(null)
  const [isTitleProbablyOverflowing, setIsTitleProbablyOverflowing] = React.useState(false)
  const { open, viewMorePopup } = useViewMore()

  React.useLayoutEffect(() => {
    const currentTitle = $title.current

    if (currentTitle) {
      const rect = currentTitle.getBoundingClientRect()
      setIsTitleProbablyOverflowing(isString(title) && rect.width < title.length * titleGlyphSize)
    }
  }, [])

  return (
    <>
      <Container hasIcon={Boolean(Icon)}>
        {Icon && <Icon color="primary" style={{ margin: "auto" /* for centering */ }} size={12} />}
        <TitleContainer ref={$title}>{title}</TitleContainer>
        {isTitleProbablyOverflowing ? (
          <DotMenuHorizontalIcon
            style={{ margin: "auto" }}
            onClick={isString(title) ? open(title) : noop}
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
