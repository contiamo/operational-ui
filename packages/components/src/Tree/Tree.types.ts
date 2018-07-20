/**
 * ITree naming convention is used because it would otherwise clash with the name of the component.
 * (in this case, component cannot be renamed TreeComponent because of styleguidist constraints)
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
