import styled from "../utils/styled"

export interface ResourceNameProps {
  strong?: boolean
}

export const ResourceName = styled("span")<ResourceNameProps>`
  font-family: ${({ theme }) => theme.font.family.code};
  color: ${({ theme }) => theme.color.text.default};
  font-weight: ${({ theme, strong }) => (strong ? theme.font.weight.bold : theme.font.weight.regular)};
`

export default ResourceName
