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
