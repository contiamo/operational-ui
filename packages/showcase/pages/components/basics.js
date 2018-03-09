import * as React from "react"
import glamorous from "glamorous"
import { Card, CardHeader, TitleType, Heading1Type, Heading2Type, BodyType, SmallType } from "@operational/components"
import { operational } from "@operational/theme"

import { Layout, Props, Playground, StaticContent } from "../../components"

const typographySnippet = `
  <div>
    <TitleType>I am a title.</TitleType>
    <Heading1Type>I am a heading1.</Heading1Type>
    <Heading2Type>I am a heading2.</Heading2Type>
    <BodyType>I am a regular body section. Feel free to paint me olive.</BodyType>
    <SmallType>I am a little smaller than that.</SmallType>
  </div>
`

const colorSnippet = `
<div style={{
  width: 80,
  height: 80,
  backgroundColor: theme.colors.info 
}} />
`

const ColorBox = glamorous.div(
  {
    display: "inline-block",
    position: "relative",
    "& > div": {
      border: "2px solid #dadada",
      width: 60,
      height: 60
    }
  },
  ({ theme }) => ({
    margin: `0 40px 40px 0`,
    "& > p": {
      ...theme.typography.small,
      position: "absolute",
      bottom: -theme.spacing * 1.5,
      left: "50%",
      transform: "translate3d(-50%, 0, 0)",
      margin: 0
    }
  })
)

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <StaticContent
        markdownContent={`
UI's need solid basics, such as colors and typography. Operational UI keeps these fairly well-defined and contained in the [theme](https://ui.contiamo.com/theming).
      `}
      />
      <h2>Colors</h2>
      <p>The library provides a set of basic colors, as well as a range of grays.</p>

      <StaticContent
        markdownContent={`
### Generic colors

These colors hold a generic semantic meaning that makes their use self-explanatory for elements such as a warning banner, a button doing something dangerous or irreversible, and the likes. We recommend using colors sparsely, as per [design guidelines](https://ui.contiamo.com/docs/design-guidelines).

Brand colors add a nice touch to interfaces made for clients - that said, they can obscure this semantics and should be used sparingly. We recommend not assigning it to non-brand theme color variables, with the occasional exception of \`info\`.
      `}
      />

      {["brand", "info", "success", "warning", "error", "white", "black"].map((color, index) => (
        <ColorBox key={index}>
          <div style={{ backgroundColor: operational.colors[color] }} />
          <p>{color}</p>
        </ColorBox>
      ))}

      <h3>Interface colors</h3>

      {["background", "sidenavBackground", "cardBackground", "separator"].map((color, index) => (
        <ColorBox key={index}>
          <div style={{ backgroundColor: operational.colors[color] }} />
          <p>{color}</p>
        </ColorBox>
      ))}

      <Playground snippet={colorSnippet} components={{}} scope={{ theme: operational }} />

      <StaticContent
        markdownContent={`
## Typography

Operational UI ships with 5 well-defined, themeable typography definitions as glamorous components:
* \`TitleType\`: used for main page title, typically in a single place on the page (we recommend the header)
* \`Heading1Type\`: used as main section titles, such as card headers or static content headings. We recommend using a font-size that is not much greater than the body (16px / 12px works well).
* \`Heading2Type\`: used as subsection titles, e.g. inside cards or in static content. Typically the same font-size as heading1 elements, only thinner and more faded.
* \`BodyType\`: used for main body copy, in most of the interface.
* \`SmallType\`: used sparingly for form labels and auxiliary content.

You can use typography components as follows:
      `}
      />

      <Playground
        snippet={typographySnippet}
        components={{ TitleType, Heading1Type, Heading2Type, BodyType, SmallType }}
      />
    </Card>
  </Layout>
)
