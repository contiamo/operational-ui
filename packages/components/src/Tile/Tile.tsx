import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { readableTextColor, darken } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  className?: string
  id?: string
  /** The label of the tile */

  label?: string
  children: React.ReactNode
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "infotile",
    borderRadius: theme.deprecated.borderRadius,
    width: 120,
    position: "relative",
    marginRight: theme.deprecated.spacing,
    padding: `${theme.deprecated.spacing / 2}px ${theme.deprecated.spacing}px`,
    backgroundColor: theme.deprecated.colors.lighterBackground,
  }),
)

const Content = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.heading1,
  }),
)

const Label = styled("small")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.small,
    opacity: 0.8,
  }),
)

const Tile = (props: Props) => (
  <Container id={props.id} className={props.className}>
    <Label>{props.label}</Label>
    <Content>{props.children}</Content>
  </Container>
)

export default Tile
