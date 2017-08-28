import React from "react"
import glamorous from "glamorous"
import Playground from "component-playground"
import SyntaxHighlighter from "react-syntax-highlighter"

import Table from "../../components/PropsTable/PropsTable"
import { Tooltip as DemoTooltip } from "contiamo-ui-components"

import snippet from "./snippet"
import propDescription from "./propDescription"

const StickyTooltip = glamorous(DemoTooltip)({
  position: "relative",
  top: 0,
  left: 0,
  transform: "none"
})

export default () =>
  <div>
    <h1>Tooltips</h1>
    <h2>
      These elements give helpful hints about actions an end-user can perform.
      They are designed to be reusable, elegant and unobtrusive.
    </h2>

    <p>
      Tooltips are great for UX. They can (and in many cases should) be used
      along with, and in, other components. For this reason, we took a highly
      versatile approach to our tooltips.
    </p>

    <h2>Usage</h2>
    <Playground
      codeText={snippet.tooltip}
      scope={{ React, Tooltip: StickyTooltip }}
    />

    <h2>Props</h2>
    <Table css={{ marginBottom: 32 }} props={propDescription} />

    <h1>withTooltip</h1>
    <h2>
      Tooltips come with an additional higher-order component (or HOC) called
      `withTooltip`. This component wraps any pre-existing React component that
      you may have and gives it a tooltip, which you can pass as a prop.
    </h2>

    <div style={{ marginBottom: 32 }} />

    <h2>Usage</h2>
    <SyntaxHighlighter language="javascript">
      {snippet.withTooltip}
    </SyntaxHighlighter>
    <p>
      <strong>
        Note: The `color` and `anchor` props are still available, but prepended
        with the word `tooltip` in order not to override any similar props on
        your component.
      </strong>
    </p>
  </div>
