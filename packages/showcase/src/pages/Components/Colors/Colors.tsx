import * as React from "react"
import glamorous from "glamorous"
import { Card, CardHeader, Heading2Type } from "@operational/components"
import { operational, Theme } from "@operational/theme"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as simpleSnippet from "./snippets/Colors.simple.snippet"

const ColorBox = glamorous.div(
  {
    display: "inline-block",
    "& > div": {
      border: "2px solid #dadada",
      width: 40,
      height: 40
    }
  },
  ({ theme }: { theme: Theme }) => ({
    margin: `0 ${theme.spacing}px ${theme.spacing}px 0`,
    "& > p": {
      ...theme.typography.small,
      margin: 0
    }
  })
)

export default () => (
  <Card>
    <CardHeader>Colors</CardHeader>

    <p>The library provides a set of basic colors, as well as a range of grays.</p>

    {Object.keys(operational.colors).map((color, index) => (
      <ColorBox key={index}>
        <div style={{ backgroundColor: operational.colors[color] }} />
        <p>{color}</p>
      </ColorBox>
    ))}

    <Playground snippet={String(simpleSnippet)} components={{}} scope={{ theme: operational }} />
  </Card>
)
