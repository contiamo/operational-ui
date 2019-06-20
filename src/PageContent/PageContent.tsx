import * as React from "react"
import Confirm, { ConfirmOptions } from "../Internals/Confirm"
import Modal, { ModalOptions } from "../Internals/Modal"
import { DefaultProps } from "../types"
import { space } from "../utils/constants"
import styled from "../utils/styled"

export interface ModalConfirmContext {
  modal: (modalOptions: ModalOptions) => void
  confirm: <T>(confirmOptions: ConfirmOptions<T>) => void
}

export const isChildFunction = (
  children: PageContentProps["children"],
): children is (modalConfirmContext: ModalConfirmContext) => React.ReactNode => typeof children === "function"

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

const Container = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "auto",
})

const PageContent = ({ children, ...props }: PageContentProps) => {
  return (
    <Modal>
      {modal => (
        <Confirm>
          {confirm => (
            <Container>
              <StyledPageContent {...props}>
                {isChildFunction(children) ? children({ confirm, modal }) : children}
              </StyledPageContent>
            </Container>
          )}
        </Confirm>
      )}
    </Modal>
  )
}

export default PageContent
