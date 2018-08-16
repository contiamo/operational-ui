import { DefaultProps, DragProps } from "../types"

/**
 * Recursive tree interface
 */
export interface Tree extends DefaultProps, DragProps {
  label: string
  tag?: string
  color?: string
  initiallyOpen?: boolean
  disabled?: boolean
  childNodes: Tree[]
  onClick?: () => void
}
