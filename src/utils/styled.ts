import styled from "@emotion/styled"
import { OperationalStyleConstants } from "./constants"

declare module "@emotion/react" {
  export interface Theme extends OperationalStyleConstants {}
}

export default styled
