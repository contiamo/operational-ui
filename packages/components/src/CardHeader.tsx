import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
  domId?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  label: "cardheader",
  display: "flex",
  alignItems: "center",
  height: 36,
  margin: theme.spacing * -1,
  marginBottom: theme.spacing * 4 / 3,
  padding: `0 ${theme.spacing}px`,
  borderBottom: `1px solid ${theme.colors.separator}`,
  fontWeight: 700,
  lineHeight: 1,
  color: theme.colors.emphasizedText,
  "* + &": {
    marginTop: theme.spacing
  },
  "&:not(:first-child)": {
    borderBottomStyle: "dashed"
  }
}))

const CardHeader = (props: IProps) => (
  <Container key={props.id} id={props.domId} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default CardHeader
