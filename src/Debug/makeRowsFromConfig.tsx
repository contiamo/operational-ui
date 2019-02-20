import { title } from "case"
import * as React from "react"

import Code from "../Code/Code"
import styled from "../utils/styled"
import { DebugProps } from "./Debug"

const DebugJSONViewer = styled(Code)<{ children?: string | string[] }>`
  color: white;
  max-width: 50vw;
`

export function makeRowsFromConfig<T>(inputValuesProp: DebugProps<T>["values"]) {
  return Object.entries(inputValuesProp).map(([key, value]) => {
    const casedKey = title(key)
    if (value instanceof Object) {
      return (
        <React.Fragment key={key}>
          <tr>
            <td colSpan={2}>{casedKey}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <DebugJSONViewer
                codeTheme={{
                  base00: "transparent",
                  base02: "transparent",
                  base04: "cyan",
                  base07: "orange",
                  base09: "white",
                }}
                syntax="json"
                src={value}
              />
            </td>
          </tr>
        </React.Fragment>
      )
    }
    return (
      <tr key={key}>
        <td>{casedKey}</td>
        <td>{value}</td>
      </tr>
    )
  })
}
