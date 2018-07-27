import * as React from "react"

import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

const Title = styled("h1")<{
  children?: React.ReactNode
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.title,
  fontFamily: theme.font.family.main,
  label: "title",
  fontWeight: theme.font.weight.medium,
  margin: 0,
  color: theme.color.text[color || "default"],
}))

const Heading1 = styled("h1")(({ theme }) => ({
  ...theme.deprecated.typography.heading1,
  margin: `${theme.deprecated.spacing / 2}px 0`,
  label: "heading1type",
}))

const Heading2 = styled("h2")(({ theme }) => ({
  ...theme.deprecated.typography.heading2,
  margin: `${theme.deprecated.spacing / 2}px 0`,
  label: "heading2type",
}))

const Body = styled("p")(({ theme }) => ({
  ...theme.deprecated.typography.body,
  margin: `${theme.deprecated.spacing / 4}px 0`,
  label: "bodytype",
}))

const Small = styled("p")(({ theme }) => ({
  ...theme.deprecated.typography.small,
  margin: `${theme.deprecated.spacing / 4}px 0`,
  label: "smalltype",
}))

export { Title, Heading1, Heading2, Body, Small }
