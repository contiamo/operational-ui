import * as React from "react"
import { ModalOptions } from "../Internals/Modal"
import { ConfirmOptions } from "../useConfirm"

export interface ModalConfirmContext {
  modal: (modalOptions: ModalOptions) => void
  confirm: <T>(confirmOptions: ConfirmOptions<T>) => void
}

/**
 * Defining a default context value here, used below when instantiating
 * the context consumer and provider below in order for context to be
 * correctly detected throughout the application.
 */
const defaultContext: ModalConfirmContext = {
  confirm: () => {
    throw new Error("You can use this function inside PageContent")
  },
  modal: () => {
    throw new Error("You can use this function inside PageContent")
  },
}

const ctx = React.createContext(defaultContext)

export const { Consumer: PageContentContext, Provider: PageContentProvider } = ctx

export const usePageContentContextContext = () => React.useContext(ctx)
