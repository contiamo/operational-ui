/**
 * Having React typings in scope is necessary for styled components not using React directly, otherwise
 * botched module names like `import("eac")` show up in the .d.ts files due to a typescript compiler error.
 * See issue: https://github.com/emotion-js/emotion/issues/788
 * @todo remove this as soon as the issue is fixed.
 */
// @ts-ignore
import * as React from "react"

import styled, { keyframes } from "react-emotion"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const Overlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.1s ease-in;
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
`

export default Overlay
