import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

export const ResourceName = styled("span")`
  font-family: ${({ theme }: { theme: OperationalStyleConstants }) => theme.font.family.code};
  color: #333333;
`

export default ResourceName
