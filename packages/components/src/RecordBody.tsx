import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  __isRecordBody?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "recordbody",
  borderTop: "1px solid",
  padding: `${theme.spacing}px ${theme.spacing}px`,
  borderColor: theme.colors.gray20,
  backgroundColor: theme.colors.gray10,
  "& > div": {
    display: "inline-block",
    marginRight: theme.spacing
  }
}))

const RecordBody = (props: IProps) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Object.assign(RecordBody, {
  defaultProps: {
    __isRecordBody: true
  }
})
