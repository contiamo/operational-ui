import { PageContentProps } from "../PageContent/PageContent"
import { ModalConfirmContext } from "../PageContent/PageContentContext"

export const isChildFunction = (
  children: PageContentProps["children"],
): children is (modalConfirmContext: ModalConfirmContext) => React.ReactNode => typeof children === "function"
