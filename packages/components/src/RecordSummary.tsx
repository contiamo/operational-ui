import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  __isRecordSummary?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "recordsummary",
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  "& > div": {
    display: "inline-block",
    marginRight: theme.spacing / 2
  }
}))

const RecordSummary = (props: IProps) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Object.assign(RecordSummary, {
  defaultProps: {
    __isRecordSummary: true
  }
})
