import React from "react"
import glamorous from "glamorous"

import { darken } from "../../../utils/color"

const SelectFilter = ({
  className,
  onChange
}: {
  className: string,
  onChange: any,
}) =>
  <div className={`${className}`}>
    <input
      onClick={e => e.stopPropagation()}
      onChange={onChange}
      className="Select__filter"
      placeholder="Filter..."
    />
  </div>

const style = ({ theme, color }: { theme: THEME, color: string }) => {
  const backgroundColor =
    color && theme.colors ? hexOrColor(color)(theme.colors[color]) : "white"

  return {
    padding: 0,
    borderBottom: "1px solid",
    borderColor: darken(backgroundColor)(10),

    "& .Select__filter": {
      width: "100%",
      padding: theme.spacing ? theme.spacing / 2 : 8,
      border: 0,
      outline: "none",
      font: "inherit"
    }
  }
}

export default glamorous(SelectFilter)(style)
