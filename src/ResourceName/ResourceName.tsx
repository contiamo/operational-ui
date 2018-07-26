import styled from "../utils/styled"

export const ResourceName = styled("span")`
  font-family: ${({ theme }) => theme.font.family.code};
  color: ${({ theme }) => theme.color.text.dark};
`

export default ResourceName
