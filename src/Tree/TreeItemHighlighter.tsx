import React, { useMemo } from "react"
import Highlighter, { HighlighterProps } from "react-highlight-words"
import { withTheme } from "emotion-theming"

import { OperationalStyleConstants } from "../utils/constants"

const TreeItemHighlighter = ({ theme, highlightStyle, ...props }: HighlighterProps & OperationalStyleConstants) => {
  const computedHighlightStyle = useMemo(() => {
    return highlightStyle
      ? highlightStyle
      : {
          color: theme.color.text.action,
          backgroundColor: "transparent",
        }
  }, [highlightStyle, theme])

  return <Highlighter {...props} highlightStyle={computedHighlightStyle} />
}

export default withTheme(TreeItemHighlighter)
