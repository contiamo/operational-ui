import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { fadeIn } from "@operational/utils"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  label: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: 56,
  flex: "0 0 56px",
  borderBottom: "1px solid rgba(255, 255, 255, .1)",
  backgroundColor: "inherit"
}))

const Label = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: "fit-content",
  whiteSpace: "pre"
}))

const SidenavHeader = (props: IProps) => {
  return (
    <Container key={props.id} css={props.css} className={props.className}>
      <Label>{props.label}</Label>
    </Container>
  )
}

export default SidenavHeader
