import * as React from "react"
import { Theme } from "@operational/theme"
import { Table, Button } from "@operational/components"
import * as constants from "../../constants"
import { Subsection } from "../../components"

export const title = "Tables"

export const docsUrl = `${constants.docsBaseUrl}/components/table.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Tables.tsx`

export const Component = () => (
  <>
    <Subsection>
      <Table
        onRowClick={console.log.bind(console)}
        rows={[["Paul", "The 12th", "Green"], ["Patrick", "The 11th", "Black"], ["Patrick", "The 11th", "Black"]]}
        columns={["Name", "Birthday", "Favorite color"]}
        __experimentalColumnCss={[
          ({ theme }: { theme: Theme }) => ({ flex: `0 0 ${theme.spacing * 10}px` }),
          { flex: "0 0 120px" },
        ]}
        __experimentalRowActions={[
          <Button condensed color="info">
            Details
          </Button>,
          <Button condensed color="info">
            Details
          </Button>,
          <Button condensed color="info">
            Details
          </Button>,
        ]}
      />
    </Subsection>
    <Subsection>
      <Table rows={[]} columns={["Name", "Birthday", "Favorite color"]} />
    </Subsection>
  </>
)
