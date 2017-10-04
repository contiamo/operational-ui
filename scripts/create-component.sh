#!/bin/sh

# Constants

COMP_ROOT="packages/ui-components/src/$1"
SHOWCASE_ROOT="packages/showcase/src/pages/components/$1s"

# Create component

mkdir $COMP_ROOT
touch $COMP_ROOT/$1.tsx

cat > $COMP_ROOT/$1.tsx << EOL
import * as React from "react"
import glamorous from "glamorous"

type Props = {
  className?: string
  value: string
  children?: any
}

const Container = glamorous.div(
  // Static styles
  {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
  },
  // Dynamic/theme-dependent styles
  ({ theme }: { theme: Theme }): any => ({
    margin: theme.spacing * 2
  })
)

const Content = glamorous.div(
  // Static styles
  {
    color: 'green'
  }, ({ theme, active }: { theme: Theme, active: boolean }): any => ({
  // Local prop-dependent styling (see active prop assignment in component definition below)
  backgroundColor: active ? theme.colors.palette.info : "green"
  })
)

const $1: React.SFC<Props> = ({ value }: Props) => (
  <Container>
    <Content active>{value}</Content>
  </Container>
)

export default $1
EOL

# Create test file

mkdir $COMP_ROOT/__tests__
touch $COMP_ROOT/__tests__/$1.test.tsx

cat > packages/ui-components/src/$1/__tests__/$1.test.tsx << EOL
import * as React from "react"
import { render } from "enzyme"

import Themeless$1 from "../$1"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const $1 = wrapDefaultTheme(Themeless$1)

describe("$1 Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<$1 value="SomeValue" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
EOL

# Create showcase file

mkdir $SHOWCASE_ROOT
touch $SHOWCASE_ROOT/$1s.tsx

cat > $SHOWCASE_ROOT/$1s.tsx << EOL
import * as React from "react"

import Table from "../../components/PropsTable/PropsTable"
import Playground from "../../components/Playground/Playground"
import { $1, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/$1s.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>$1s</CardHeader>

    <p>
      $1s are great components!
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ $1 }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
EOL

# Create showcase prop description

touch $SHOWCASE_ROOT/propDescription.ts

cat > $SHOWCASE_ROOT/propDescription.ts << EOL
export default [
  {
    name: "value",
    description: "Description of the value prop.",
    defaultValue: "Hello World",
    type: "string",
    optional: false
  }
]
EOL

# Create showcase snippet

mkdir $SHOWCASE_ROOT/snippets
touch $SHOWCASE_ROOT/snippets/$1s.simple.snippet.tsx

cat > $SHOWCASE_ROOT/snippets/$1s.simple.snippet.tsx << EOL
import * as React from "react"
import { TestComp } from "contiamo-ui-components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (() => {
  const value = "Hello"

  return (
    <div>
      <TestComp value={value} />
    </div>
  )
})()
EOL

# Create showcase test file

mkdir $SHOWCASE_ROOT/__tests__
touch $SHOWCASE_ROOT/__tests__/$1s.test.tsx

cat > $SHOWCASE_ROOT/__tests__/$1s.test.tsx << EOL
import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import Themeless$1s from "../$1s"

const $1s = wrapTheme(contiamoTheme)(Themeless$1s)

describe("$1s Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<$1s />)).toMatchSnapshot()
  })
})
EOL

echo
echo "🎉 $1 component created!"
echo "A few things to do manually:"
echo "* import component into packages/ui-components/index.ts + add to named exports"
echo "* add showcase page to router at $SHOWCASE_ROOT/Components.tsx"
echo "* add url to showcase side navigation packages/showcase/components/Sidebar.tsx"
echo "* enjoy your new component!"
