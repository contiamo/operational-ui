import * as React from "react"
import { useModal } from "../Internals/Modal"
import { DefaultProps } from "../types"
import { space } from "../utils/constants"
import styled from "../utils/styled"
import { isChildFunction } from "../utils/isChildFunction"
import { ConfirmOptions, useConfirm } from "../useConfirm"
import { PageContentProvider, ModalConfirmContext } from "./PageContentContext"

export interface BasePageContentProps extends DefaultProps {
  /** Children to render, you */
  children?: React.ReactNode | ((modalConfirmContext: ModalConfirmContext) => React.ReactNode)
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
}

export interface PageContentNoPaddingProps extends BasePageContentProps {
  /** Don't pad */
  noPadding?: boolean
  /** Add a padding */
  padding?: never
}

export interface PageContentWithPaddingProps extends BasePageContentProps {
  /** Don't pad */
  noPadding?: never
  /** Add a padding */
  padding?: keyof typeof space
}

export type PageContentProps = PageContentNoPaddingProps | PageContentWithPaddingProps

const sideSize = 280

const StyledPageContent = styled("div", {
  shouldForwardProp: props => !["fill", "padding", "noPadding"].includes(props),
})<PageContentProps>(props => {
  const gridTemplateColumns = {
    main: props.fill ? "100%" : "auto",
    "main side": `auto ${sideSize}px`,
    "side main": `${sideSize}px auto`,
  }[props.areas || "main"]

  return {
    gridTemplateColumns,
    display: "grid",
    alignItems: "start",
    gridTemplateAreas: `"${props.areas || "main"}"`,
    gridGap: props.theme.space.element,
    width: "100%",
    height: "100%",
    minWidth: props.theme.pageSize.min,
    maxWidth: props.fill ? "none" : props.theme.pageSize.max,

    /**
     * Since PageContent is in a scrollable context,
     * a user often scrolls past the bottom padding
     * on large pages, and the bottom edge of the last
     * child touches the bottom of the container: there
     * _is no padding on the bottom_ because it has been
     * passed.
     *
     * The following hack adds a small piece of pseudo-DOM
     * in order to preserve space on the bottom.
     *
     * The `grid-gap` adds appropriate bottom spacing to
     * PageContent since this pseudo-element is seen as a
     * grid row.
     */
    ...(props.fill
      ? {}
      : {
          "::after": {
            content: '""',
            display: "block",
            height: 1,
          },
        }),
  }
})

const Container = styled.div({
  width: "100%",
  height: "100%",
})

const PageContent = ({ children, ...props }: PageContentProps) => {
  const [modal, ModalPlaceholder] = useModal()
  const [confirmWithUnknownType, ConfirmPlaceholder] = useConfirm()
  const confirm = confirmWithUnknownType as <T>(confirmOptions: ConfirmOptions<T>) => void
  const value = React.useMemo(() => ({ confirm, modal }), [confirm, modal])

  return (
    <PageContentProvider value={value}>
      <Container>
        <StyledPageContent {...props}>
          {isChildFunction(children) ? children({ confirm, modal }) : children}
        </StyledPageContent>
      </Container>
      <ConfirmPlaceholder />
      <ModalPlaceholder />
    </PageContentProvider>
  )
}

export default PageContent
