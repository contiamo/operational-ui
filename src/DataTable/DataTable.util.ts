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
