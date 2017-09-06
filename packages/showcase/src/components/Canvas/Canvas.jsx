// @flow
import React from "react"
import type { Node } from "react"
import glamorous from "glamorous"

import { Card } from "contiamo-ui-components"

type Props = { className: string, children: Node }

const Canvas = ({ children }: Props) =>
    <Card css={styles}>
      <div className="Canvas__body">
        {children}
      </div>
    </Card>,
  styles = ({ theme }: { theme: THEME }): {} => ({
    display: "flex",
    alignItems: "flex-start",
    marginLeft: theme.spacing,
    maxHeight: "100%",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",

    "& a:link, & a:visited": {
      color: theme.colors ? theme.colors.primary : "blue"
    },

    "& a:hover": {
      color: theme.colors ? theme.colors.secondary : "green"
    },

    "& .Canvas__body": {
      maxWidth: 768
    },

    "& .playground": {
      display: "flex",
      width: "80vw",
      maxWidth: 850,
      maxHeight: 320
    },

    "& .playgroundCode, & .playgroundPreview": {
      flex: "1 1 50%"
    },
    "& .playgroundPreview": {
      marginLeft: 16
    },
    "& .CodeMirror-wrap.CodeMirror": {
      minHeight: 320
    }
  })

export default glamorous(Canvas)(styles)
export { Canvas }
