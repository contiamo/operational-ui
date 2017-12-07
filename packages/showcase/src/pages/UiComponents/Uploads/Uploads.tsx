import * as React from "react"
import { Upload, Card, CardHeader, Icon, Button, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/Uploads.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Uploads</CardHeader>

    <p>Uploads are great components!</p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Upload, Icon, Button }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
