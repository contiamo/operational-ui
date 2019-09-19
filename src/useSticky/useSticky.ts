import * as React from "react"
import { isRefRefObject } from "../utils/isRefRefObject"

/**
 *
 * Hook to take a component from an initial position
 * and FIX/stick it to the screen. Typically used for
 * nailing down positions of elements and then placing
 * them above other elements in the viewport.
 *
 * Used in:
 * - SidenavItem/Popout
 * - ContextMenu
 *
 * @param inputRef - a ref to the component we would like to stick
 * @param initialValue - initial positioning CSS values
 */
const useSticky = ({
  inputRef,
  initialValue,
}: {
  inputRef: React.Ref<HTMLElement>
  initialValue?: {
    top?: string
    left?: string
    width?: string
    position?: "fixed" | "absolute" | "sticky" | "relative" | "static" | "initial"
  }
}) => {
  const defaultDisplaySettings = {
    top: (initialValue && initialValue.top) || "0",
    left: (initialValue && initialValue.left) || "100%",
    width: (initialValue && initialValue.width) || "100%",
    position: (initialValue && initialValue.position) || "absolute",
  }

  const [displaySettings, setDisplaySettings] = React.useState(defaultDisplaySettings)

  React.useLayoutEffect(() => {
    const node = isRefRefObject(inputRef) && inputRef.current

    if (node) {
      const rect = node.getBoundingClientRect()
      setDisplaySettings({ position: "fixed", left: `${rect.left}px`, width: `${rect.width}px`, top: `${rect.top}px` })
    }
  }, [inputRef])

  return displaySettings
}

export default useSticky
