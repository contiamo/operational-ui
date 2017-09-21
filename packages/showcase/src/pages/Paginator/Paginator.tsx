import * as React from "react"

import Table from "../../components/PropsTable/PropsTable"
import Playground from "../../components/Playground/Playground"
import { Paginator, CardHeader } from "contiamo-ui-components"

import * as PaginatorSnippet from "./snippets/Paginator.snippet"
import propDescription from "./propDescription"

export default () => (
  <div>
    <CardHeader>Paginator</CardHeader>

    <p>
      Buttons clearly indicate a point of interaction that allow users to perform actions in applications. On Contiamo,
      buttons exist independently, and in groups. These buttons can also take on any number of colors required.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(PaginatorSnippet)} components={{ Paginator }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
)
