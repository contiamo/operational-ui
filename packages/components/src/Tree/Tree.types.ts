/**
 * Recursive tree interface
 */
export interface Tree {
  label: string
  tag?: string
  color?: string
  initiallyOpen?: boolean
  disabled?: boolean
  childNodes: Tree[]
  onClick?: () => void
}
