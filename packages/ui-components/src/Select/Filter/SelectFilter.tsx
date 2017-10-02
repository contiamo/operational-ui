import * as React from "react"
import { SFC } from "react"
import glamorous from "glamorous"

import { hexOrColor, darken } from "contiamo-ui-utils"

type Props = {
  className?: string
  placeholder?: string
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => Promise<void>
  theme?: Theme
  color?: string
}

const style: {} = ({ theme, color }: Props) => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors.palette[color]) : "white"

  return {
    padding: 0,
    borderBottom: "1px solid",
    borderColor: darken(backgroundColor)(10),

    "& .Select__filter": {
      width: "100%",
      padding: theme.spacing / 2,
      border: 0,
      outline: "none",
      font: "inherit"
    }
  }
}

const SelectFilter: SFC<Props> = ({ className, placeholder, onChange }: Props) => (
  <div className={className}>
    <input
      onClick={e => e.stopPropagation()}
      onChange={onChange}
      className="Select__filter"
      placeholder={placeholder}
    />
  </div>
)

SelectFilter.defaultProps = {
  placeholder: "Filter..."
}

export default glamorous(SelectFilter)(style)
