/**
 * Having React typings in scope is necessary for styled components not using React directly, otherwise
 * botched module names like `import("eac")` show up in the .d.ts files due to a typescript compiler error.
 * See issue: https://github.com/emotion-js/emotion/issues/788
 * @todo remove this as soon as the issue is fixed.
 */
// @ts-ignore
import * as React from "react"

import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface PageAreaProps extends DefaultProps {
  /** Name of the area */
  name?: "main" | "side"
}

export const PageArea = styled("div")<PageAreaProps>(({ name }) => ({
  gridArea: name,
}))

export default PageArea
