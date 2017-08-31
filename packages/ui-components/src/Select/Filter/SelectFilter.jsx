// @flow
import React from "react"
import glamorous from "glamorous"

import { hexOrColor, darken } from "contiamo-ui-utils"

const SelectFilter = ({
    className,
    placeholder,
    onChange
  }: {
    className?: string,
    placeholder?: string,
    onChange?: () => mixed,
  }) =>
    <div className={className}>
      <input
        onClick={e => e.stopPropagation()}
        onChange={onChange}
        className="Select__filter"
        placeholder={placeholder}
      />
    </div>,
  style = ({ theme, color }: { theme: THEME, color: string }) => {
    const backgroundColor = color && theme.colors ? hexOrColor(color)(theme.colors[color]) : "white"

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

SelectFilter.defaultProps = {
  placeholder: "Filter..."
}

export default glamorous(SelectFilter)(style)
