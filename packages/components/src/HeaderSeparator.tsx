import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: 5,
  height: 5,
  margin: `0 ${theme.spacing}px`,
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.2)"
}))

export default (props: IProps) => <Container key={props.id} css={props.css} className={props.className} />
