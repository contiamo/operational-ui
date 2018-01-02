import { Card } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"

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
    <Card>
      <StaticContent markdownContent={markdownContent} />
    </Card>
  </Layout>
)
