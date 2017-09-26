#!/bin/sh

# Create component

mkdir packages/ui-components/src/$1
touch packages/ui-components/src/$1/$1.tsx

cat > packages/ui-components/src/$1/$1.tsx << EOL
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
  backgroundColor: active ? theme.colors.info : "green"
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

mkdir packages/ui-components/src/$1/__tests__
touch packages/ui-components/src/$1/__tests__/$1.test.tsx

cat > packages/ui-components/src/$1/__tests__/$1.test.tsx << EOL
import * as React from "react"
import { render } from "enzyme"

import Themeless$1 from "../$1"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const $1 = wrapDefaultTheme(Themeless$1)

describe("$1", () => {
  it("Should render", () => {
    const renderedComponent = render(<$1 value="SomeValue"></$1>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
EOL

# Create showcase file

mkdir packages/showcase/src/pages/$1s
touch packages/showcase/src/pages/$1s/$1s.tsx

cat > packages/showcase/src/pages/$1s/$1s.tsx << EOL
import * as React from "react"

import Table from "../../components/PropsTable/PropsTable"
import Playground from "../../components/Playground/Playground"
import { $1, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/$1s.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <div>
    <CardHeader>$1s</CardHeader>

    <p>
      $1s are great components!
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ $1 }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
)
EOL

# Create showcase prop description

touch packages/showcase/src/pages/$1s/propDescription.ts

cat > packages/showcase/src/pages/$1s/propDescription.ts << EOL
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

mkdir packages/showcase/src/pages/$1s/snippets
touch packages/showcase/src/pages/$1s/snippets/$1s.simple.snippet.tsx

cat > packages/showcase/src/pages/$1s/snippets/$1s.simple.snippet.tsx << EOL
import * as React from "react"
import { TestComp } from "contiamo-ui-components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (function() {
  const value = "Hello"

  return (
    <div>
      <TestComp value={value} />
    </div>
  )
})()
EOL

# Create showcase test file

mkdir packages/showcase/src/pages/$1s/__tests__
touch packages/showcase/src/pages/$1s/__tests__/$1s.test.tsx

cat > packages/showcase/src/pages/$1s/__tests__/$1s.test.tsx << EOL
import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import Themeless$1sPage from "../$1s"

const ButtonsPage = wrapDefaultTheme(Themeless$1sPage)

describe("$1s Page", () => {
  it("Should render correctly", () => {
    expect(render(<$1sPage />)).toMatchSnapshot()
  })
})
EOL

echo
echo "🎉 $1 component created!"
echo 'A few things to do manually:'
echo '* import component into packages/ui-components/index.ts + add to named exports'
echo '* add showcase page to router at packages/showcase/pages/Components.tsx'
echo '* add url to showcase side navigation packages/showcase/components/Sidebar.tsx'
echo '* enjoy your new component!'
