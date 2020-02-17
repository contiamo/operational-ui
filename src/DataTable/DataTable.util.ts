import { DataTableProps } from "./DataTable"

export const defaultRowHeight = 35

export const getHeaderRowHeight = (initialRowHeight: DataTableProps<any, any>["rowHeight"]) =>
  initialRowHeight === "compact" ? defaultRowHeight : getRowHeight(initialRowHeight)

export const getRowHeight = (initialRowHeight: DataTableProps<any, any>["rowHeight"]): number => {
  switch (initialRowHeight) {
    case "compact":
      return 22
    case "regular":
      return defaultRowHeight
    default:
      return initialRowHeight || defaultRowHeight
  }
}

const canScroll = (overflow: string) => overflow === "auto" || overflow === "scroll"

// inspired by https://github.com/civiccc/react-waypoint/blob/6004756ad6b6699f358fc6008e29e242b2777379/src/waypoint.jsx#L134
export const findScrollableAncestor = (node: Element) => {
  while (node.parentNode) {
    if (node === document.body) {
      // We've reached all the way to the root node.
      return window
    }

    const style = window.getComputedStyle(node)
    const overflowX = style.getPropertyValue("overflow-x")
    const overflowY = style.getPropertyValue("overflow-y")
    const overflow = style.getPropertyValue("overflow")

    if (canScroll(overflowX) || canScroll(overflowY) || canScroll(overflow)) {
      return node
    }

    node = node.parentNode as Element
  }

  // A scrollable ancestor element was not found, which means that we need to
  // do stuff on window.
  return window
}
