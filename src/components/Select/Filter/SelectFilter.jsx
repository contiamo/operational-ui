// @flow
import React from "react"
import glamorous from "glamorous"

import { hexOrColor, darken } from "../../../utils/color"

const SelectFilter = ({
  className,
  placeholder,
  onChange
}: {
  className?: string,
  placeholder?: string,
  onChange?: void,
}) =>
  <div className={className}>
    <input
      onClick={e => e.stopPropagation()}
      onChange={onChange}
      className="Select__filter"
      placeholder={placeholder}
    />
  </div>

SelectFilter.defaultProps = {
  placeholder: "Filter..."
}

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
