// @flow
import React from "react"
import glamorous from "glamorous"

import { Card } from "contiamo-ui-components"

const Canvas = ({
  className,
  children
}: {
  className: string,
  children: HTMLElement,
}) =>
  <Card padding={16} css={styles}>
    <div className="Canvas__body">
      {children}
    </div>
  </Card>

const styles = ({ theme }: { theme: THEME }): {} => ({
  display: "flex",
  alignItems: "flex-start",
  marginLeft: 16,
  width: "100%",
  height: "100%",
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
    maxWidth: 1500
  },

  "& .playgroundCode, & .playgroundPreview": {
    flex: "1 1 50%"
  },
  "& .playgroundPreview": {
    marginLeft: 16
  },
  "& .CodeMirror-wrap.CodeMirror": {
    minHeight: 480
  }
})

export default glamorous(Canvas)(styles)
export { Canvas }
