import { OperationalStyleConstants } from "../utils/constants"

export const getTop = ({
  theme,
  top,
  height: modalHeight,
}: {
  theme: OperationalStyleConstants
  top: number
  height: number
}) => {
  // for SSR
  if (!window) {
    return 0
  }

  const viewportHeight = window.innerHeight
  const maxHeight = viewportHeight - theme.space.element

  const isOutOfBoundsOfMaxHeight = modalHeight > maxHeight
  const doesModalOverflowViewportHeight = viewportHeight < top + modalHeight

  if (isOutOfBoundsOfMaxHeight) {
    return 0
  }

  if (doesModalOverflowViewportHeight) {
    return viewportHeight - modalHeight - theme.space.element
  }

  // top is fine
  return top
}

export const getContainerHeight = ({
  modalHeight,
  anchorHeight,
  height,
  theme,
}: {
  modalHeight: number | null
  anchorHeight: number | false
  height?: string | number
  theme: OperationalStyleConstants
}) => {
  // If we don't have an anchor or the height is a concrete value
  if (!modalHeight || !anchorHeight) {
    return height
  }

  // ⚠️ From here, we are always working with anchors.

  // If we're anchored and the height is "auto" with enough space, use the "auto" size.
  if (height === "auto" && anchorHeight > modalHeight) {
    return "auto"
  }

  return `calc(${anchorHeight}px - ${theme.space.content * 2}px)`
}
