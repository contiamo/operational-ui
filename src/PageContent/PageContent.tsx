import * as React from "react"
import Confirm, { ConfirmOptions } from "../Internals/Confirm"
import Modal, { ModalOptions } from "../Internals/Modal"
import { PageProps } from "../Page/Page"
import PageArea from "../PageArea/PageArea"
import styled from "../utils/styled"

export interface ModalConfirmContext {
  modal: (modalOptions: ModalOptions) => void
  confirm: (confirmOptions: ConfirmOptions) => void
}

export interface Props {
  /** Children to render, you */
  children?: PageProps["children"]
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
  /**
   * Confirm and Modal callback give by the Page component internally
   * @internal
   */
  __modalConfirmContext?: ModalConfirmContext
}

const StyledPageContent = styled("div")<{ areas?: Props["areas"]; isFill?: boolean }>(props => {
  const gridTemplateColumns = {
    main: "auto",
    "main side": "auto 280px",
    "side main": "280px auto",
  }[props.areas || "main"]

  return {
    gridTemplateColumns,
    display: "grid",
    alignItems: "start",
    gridTemplateAreas: `"${props.areas}"`,
    gridGap: props.theme.space.element,
    width: "100%",
    height: "100%",
    padding: props.theme.space.element,
    overflow: "auto",
  }
})

// `fill` must be rename internally to avoid conflict with the native `fill` DOM attribute
const PageContent: React.SFC<Props> = ({ fill, children, __modalConfirmContext, ...props }) => {
  const oneChild = typeof children === "function" || React.Children.count(children) === 1

  return (
    <Modal>
      {modal => (
        <Confirm>
          {confirm => (
            <StyledPageContent {...props}>
              {oneChild ? (
                <PageArea fill={fill}>
                  {typeof children === "function" ? children({ confirm, modal }) : children}
                </PageArea>
              ) : (
                children
              )}
            </StyledPageContent>
          )}
        </Confirm>
      )}
    </Modal>
  )
}

export default PageContent
