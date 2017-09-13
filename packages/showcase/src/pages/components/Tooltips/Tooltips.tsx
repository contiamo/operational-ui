import * as React from "react"
import glamorous from "glamorous"
import Playground from "component-playground"
import SyntaxHighlighter from "react-syntax-highlighter"

import { Tooltip as DemoTooltip, CardHeader } from "contiamo-ui-components"
import Table from "../../../components/PropsTable/PropsTable"

import * as basicSnippet from "./snippets/basic.snippet"
import withTooltipSnippet from "./snippets/with-tooltip"
import propDescription from "./propDescription"
import { toReactPlayground } from "../../../utils/snippet"

const StickyTooltip = glamorous(DemoTooltip)({
  position: "relative",
  top: 0,
  left: 0,
  transform: "none"
})

export default () =>
  <div>
    <CardHeader>Tooltips</CardHeader>
    <p>
      These elements give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant
      and unobtrusive. Tooltips are great for UX. They can (and in many cases should) be used along with, and in, other
      components. For this reason, we took a highly versatile approach to our tooltips.
    </p>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(basicSnippet))} scope={{ React, Tooltip: StickyTooltip }} />

    <h4>Props</h4>
    <Table css={{ marginBottom: 32 }} props={propDescription} />

    <CardHeader>withTooltip</CardHeader>
    <p>
      Tooltips come with an additional higher-order component (or HOC) called `withTooltip`. This component wraps any
      pre-existing React component that you may have and gives it a tooltip, which you can pass as a prop.
    </p>

    <div style={{ marginBottom: 32 }} />

    <h4>Usage</h4>
    <SyntaxHighlighter language="javascript">{withTooltipSnippet}</SyntaxHighlighter>
    <p>
      <strong>
        Note: The `color` and `anchor` props are still available, but prepended with the word `tooltip` in order not to
        override any similar props on your component.
      </strong>
    </p>
  </div>
