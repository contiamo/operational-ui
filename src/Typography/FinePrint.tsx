/**
 * Having React typings in scope is necessary for styled components not using React directly, otherwise
 * botched module names like `import("eac")` show up in the .d.ts files due to a typescript compiler error.
 * See issue: https://github.com/emotion-js/emotion/issues/788
 * @todo remove this as soon as the issue is fixed.
 */
// @ts-ignore
import * as React from "react"

import styled from "../utils/styled"

export const FinePrint = styled("p")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.lineHeight,
  margin: `${theme.space.small}px 0 ${theme.space.big}px 0`,
  color: theme.color.text.lightest,
  ":last-child": {
    marginBottom: 0,
  },
}))

export default FinePrint
