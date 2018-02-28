import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  __isRecordHeader?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "recordheader",
  ...theme.typography.heading2,
  "& > div": {
    display: "inline-block",
    marginRight: theme.spacing / 2
  }
}))

const RecordHeader = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Object.assign(RecordHeader, {
  defaultProps: {
    __isRecordHeader: true
  }
})
