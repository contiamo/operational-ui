import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  __isRecordBody?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "recordbody",
  borderTop: "1px solid",
  padding: `${theme.spacing}px ${theme.spacing}px`,
  borderColor: theme.colors.border,
  "& > div": {
    display: "inline-block",
    marginRight: theme.spacing
  }
}))

const RecordBody = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Object.assign(RecordBody, {
  defaultProps: {
    __isRecordBody: true
  }
})
