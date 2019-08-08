import { PageContentProps, ModalConfirmContext } from "../PageContent/PageContent"

export const isChildFunction = (
  children: PageContentProps["children"],
): children is (modalConfirmContext: ModalConfirmContext) => React.ReactNode => typeof children === "function"
