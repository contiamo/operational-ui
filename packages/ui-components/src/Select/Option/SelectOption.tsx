import * as React from "react"
import { SFC } from "react"
import glamorous from "glamorous"


import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Props = {
  key: number
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
  theme?: Theme
  color?: string
}

const SelectOption: SFC<Props> = ({ className, selected, onClick, children }: Props) =>
    <div
      className={`${className} Select__option${selected ? " Select__option_selected" : ""}`}
      tabIndex={-2}
      role="option"
      aria-selected={selected}
      onClick={onClick}
    >
      {children}
    </div>,
  style = ({ theme, color }: Props) => {
    const backgroundColor = color && theme.colors ? hexOrColor(color)(theme.colors[color]) : "white"

    return {
      padding: theme.spacing ? theme.spacing / 2 : 8,
      backgroundColor,
      color: readableTextColor(backgroundColor)(["black", "white"]),
      outline: "none",

      ":hover": {
        backgroundColor: darken(backgroundColor)(5),
        color: readableTextColor(darken(backgroundColor)(5))(["black", "white"]),
      },

      "& + .Select__option": {
        borderTop: "1px solid",
        borderColor: darken(backgroundColor)(10),
      },

      "&.Select__option_selected": {
        color: readableTextColor(backgroundColor)(["#aaa"]),
      },
    }
  }

SelectOption.defaultProps = {
  selected: false,
}

export default glamorous(SelectOption)(style)
export { SelectOption }
