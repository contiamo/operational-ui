import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  __isRecordDetails?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "recorddetails",
  borderTop: "1px solid",
  padding: `${theme.spacing}px ${theme.spacing}px`,
  borderColor: theme.colors.gray20,
  "& > div": {
    display: "inline-block",
    marginRight: theme.spacing
  }
}))

const RecordDetails = (props: IProps) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Object.assign(RecordDetails, {
  defaultProps: {
    __isRecordDetails: true
  }
})
