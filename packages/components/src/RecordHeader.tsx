import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  __isRecordHeader?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "recordheader",
  ...theme.typography.heading2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 48,
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  "& > div": {
    display: "inline-block",
    marginRight: theme.spacing / 2
  }
}))

const RecordHeader = (props: IProps) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Object.assign(RecordHeader, {
  defaultProps: {
    __isRecordHeader: true
  }
})
