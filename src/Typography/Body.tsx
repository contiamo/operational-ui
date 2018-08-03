/**
 * Having React typings in scope is necessary for styled components not using React directly, otherwise
 * botched module names like `import("eac")` show up in the .d.ts files due to a typescript compiler error.
 * See issue: https://github.com/emotion-js/emotion/issues/788
 * @todo remove this as soon as the issue is fixed.
 */
// @ts-ignore
import * as React from "react"

import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export const Body = styled("p")<{
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.body,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.lineHeight,
  margin: `0 0 ${theme.space.element}px 0`,
  color: theme.color.text[color || "default"],
}))

export default Body
