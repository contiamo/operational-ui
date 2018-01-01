import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import PageContent from "../../components/PageContent"
import Canvas from "../../components/Canvas"

const markdownContent = `
The theme is a JS object with a predefined structure, containing primitive constants used by the different components. Modifying this object is the first and cleanest option to customize the components.

## Colors

TBD

## Typography

TBD

## Other primitives 

TBD
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Theming</CardHeader>
        <StaticContent markdownContent={markdownContent} />
      </Card>
    </Canvas>
  </Layout>
)

