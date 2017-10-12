import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Upload, Card, CardHeader, Icon, Button } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Uploads.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Uploads</CardHeader>

    <p>Uploads are great components!</p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Upload, Icon, Button }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
