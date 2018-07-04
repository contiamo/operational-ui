import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { WithTheme, CssStatic } from "../types"

const Title = styled("h1")(
  ({
    theme,
    color,
  }: {
    theme?: OperationalStyleConstants
    children?: React.ReactNode
    color?: keyof OperationalStyleConstants["color"]["text"]
  }) => ({
    fontSize: theme.font.size.title,
    fontFamily: theme.font.family.main,
    label: "title",
    fontWeight: theme.font.weight.medium,
    margin: 0,
    color: theme.color.text[color || "default"],
  }),
)

const Heading1 = styled("h1")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.heading1,
    margin: `${theme.deprecated.spacing / 2}px 0`,
    label: "heading1type",
  }),
)

const Heading2 = styled("h2")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.heading2,
    margin: `${theme.deprecated.spacing / 2}px 0`,
    label: "heading2type",
  }),
)

const Body = styled("p")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.body,
    margin: `${theme.deprecated.spacing / 4}px 0`,
    label: "bodytype",
  }),
)

const Small = styled("p")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.small,
    margin: `${theme.deprecated.spacing / 4}px 0`,
    label: "smalltype",
  }),
)

export { Title, Heading1, Heading2, Body, Small }
