import * as React from "react"
import { useConfirm, ConfirmOptions } from "../useConfirm"

export interface Props {
  children: (confirm: <T>(confirmOptions: ConfirmOptions<T>) => void) => React.ReactNode
}

// Can we delete this?
export const Confirm: React.FC<Props> = ({ children }) => {
  const [open, Placeholder] = useConfirm()
  return (
    <>
      {children(open as <T>(confirmOptions: ConfirmOptions<T>) => void)}
      <Placeholder />
    </>
  )
}

export default Confirm
