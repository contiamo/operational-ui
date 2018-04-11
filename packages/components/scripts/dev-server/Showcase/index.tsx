import * as React from "react"
import glamorous, { Div } from "glamorous"
import { render } from "react-dom"
import { Theme } from "@operational/theme"
import { OperationalUI, Card, CardHeader } from "@operational/components"
import {
  Buttons,
  Breadcrumbs,
  Checkboxes,
  Chips,
  ContextMenus,
  DatePickers,
  Inputs,
  Paginators,
  Spinners,
  Switches,
  Tables,
  Timelines,
  Tooltips
} from "./Sections"

const Section = (props: { title: string; children: React.ReactNode }) => (
  <Card css={{ margin: "20px 0" }} id={props.title.toLowerCase()}>
    <CardHeader>{props.title}</CardHeader>
    <glamorous.Div
      css={{
        "& > *": {
          marginRight: 6,
          marginBottom: 6
        }
      }}
    >
      {props.children}
    </glamorous.Div>
  </Card>
)

const Subsection = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  margin: "30px 0",
  "& > *": {
    marginRight: theme.spacing
  }
}))

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: theme.spacing,
  maxWidth: 640,
  margin: "auto",
  "& h1": {
    ...theme.typography.title
  }
}))

const Showcase = () => (
  <OperationalUI withBaseStyles>
    <Container>
      <h1 style={{ textAlign: "center" }}>
        <code>@operational/components</code>
      </h1>
      <Section title="Breadcrumbs">
        <Breadcrumbs />
      </Section>
      <Section title="Buttons">
        <Buttons />
      </Section>
      <Section title="Checkbox">
        <Checkboxes />
      </Section>
      <Section title="Chips">
        <Chips />
      </Section>
      <Section title="Date Picker">
        <DatePickers />
      </Section>
      <Section title="Dropdown">
        <ContextMenus />
      </Section>
      <Section title="Input">
        <Inputs />
      </Section>
      <Section title="Paginator">
        <Paginators />
      </Section>
      <Section title="Timeline">
        <Timelines />
      </Section>
      <Section title="Spinners">
        <Spinners />
      </Section>
      <Section title="Tables">
        <Tables />
      </Section>
      <Section title="Tooltip">
        <Tooltips />
      </Section>
      <Section title="Switch">
        <Switches />
      </Section>
    </Container>
  </OperationalUI>
)

export default Showcase
