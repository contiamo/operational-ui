import * as React from "react"

import styled from "../utils/styled"

export interface ContactProps {
  name: string
  meta?: string
}

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;

  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.content}px;
  }
`

const Heading = styled("h6")<{ hasMeta: boolean }>`
  margin: 0 0 ${({ theme, hasMeta }) => (hasMeta ? theme.space.base : 0)}px 0;
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.color.text.dark};
`

const Meta = styled("p")`
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.fineprint}px;
  color: ${({ theme }) => theme.color.text.lightest};
`

const Contact: React.SFC<ContactProps> = ({ name, meta }) => (
  <Container>
    <Heading hasMeta={Boolean(meta)}>{name}</Heading>
    <Meta>{meta}</Meta>
  </Container>
)

export default Contact
