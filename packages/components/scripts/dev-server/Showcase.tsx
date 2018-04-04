import * as React from "react"
import glamorous, { Div } from "glamorous"
import { render } from "react-dom"
import { Theme } from "@operational/theme"
import {
  OperationalUI,
  Button,
  Tooltip,
  Chip,
  Spinner,
  Checkbox,
  Card,
  CardHeader,
  Heading2Type,
  Input,
  DatePicker,
  Paginator,
  Heading1Type,
  Switch,
  Breadcrumbs,
  Breadcrumb,
  ContextMenu,
  ContextMenuItem,
  Timeline,
  TimelineItem
} from "../../src"

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
      <h1 style={{ textAlign: "center" }}><code>@operational/components</code></h1>
      <Section title="Breadcrumbs">
        <Breadcrumbs>
          <Breadcrumb>Link one</Breadcrumb>
          <Breadcrumb>Link two</Breadcrumb>
          <Breadcrumb>Link three</Breadcrumb>
        </Breadcrumbs>
      </Section>
      <Section title="Buttons">
        <Button>Simple</Button>
        <Button color="info">Standard Colors!</Button>
        <Button color="#4281A4">Custom Colors!</Button>
        <Button disabled>Disabled!</Button>
        <Button condensed>Condensed!</Button>
      </Section>
      <Section title="Checkbox">
        <Checkbox options={["Option 1", "Option 2", "Option 3"]} selected={["Option 2"]} />
      </Section>
      <Section title="Chips">
        <Chip icon="X" onIconClick={() => {}}>
          Simple
        </Chip>
        <Chip icon="X" color="white" onIconClick={() => {}}>
          Lighter
        </Chip>
        <Chip icon="X" color="#454545" onIconClick={() => {}}>
          Darker
        </Chip>
      </Section>
      <Section title="Date Picker">
        <DatePicker start="2018-04-04" end="2018-04-14" label="Date picker label" />
      </Section>
      <Section title="Dropdown">
        <ContextMenu>
          <span>Change me!</span>
          <ContextMenuItem>To this</ContextMenuItem>
          <ContextMenuItem>..this</ContextMenuItem>
          <ContextMenuItem>...or this</ContextMenuItem>
        </ContextMenu>
      </Section>
      <Section title="Input">
        <Input value="Input field" label="Label" labelId="inputid" id="1234" />
        <Input value="Standalone input field" id="1234" />
      </Section>
      <Section title="Paginator">
        <Paginator page={2} pageCount={10} />
      </Section>
      <Section title="Timeline">
        <Timeline>
          <TimelineItem>Event 1</TimelineItem>
          <TimelineItem>Event 2</TimelineItem>
          <TimelineItem color="error">Event 3</TimelineItem>
          <TimelineItem>Event 4</TimelineItem>
        </Timeline>
      </Section>
      <Section title="Spinners">
        <Spinner />
      </Section>
      <Section title="Tooltip">
        <Div css={{ position: "relative", width: "fit-content" }}>
          <span>Difficult to understand</span>
          <Tooltip right>Helping</Tooltip>
        </Div>
      </Section>
      <Section title="Switch">
        <Switch on />
      </Section>
    </Container>
  </OperationalUI>
)

export default Showcase
