import * as React from "react"

import Body from "../Typography/Body"
import styled from "../utils/styled"
import { ChevronRightIcon } from "../Icon"

export type ImageURL = string

export interface ListProps {
  items: Array<{
    title?: string
    photo: ImageURL | React.ReactNode
    description: string
    onClick?: () => void
  }>
  fullWidth?: boolean
}

const Container = styled("div")<{ fullWidth: ListProps["fullWidth"]; onClick: ListProps["items"][0]["onClick"] }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.big}px;
  border: 1px solid ${({ theme }) => theme.color.border.disabled};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "640px")};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "initial")};
  background-color: ${({ theme }) => theme.color.white};

  :hover {
    background-color: ${({ theme }) => theme.color.background.lighter};
  }

  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.content}px;
  }
`

const ImageContainer = styled("div")`
  margin-right: ${({ theme }) => theme.space.element}px;
  width: 170px;
  flex: 0 0 170px;

  img {
    max-width: 100%;
  }
`

const StyledIcon = styled(ChevronRightIcon)`
  fill: ${({ theme }) => theme.color.border.default};
  width: 24px;
  flex: 0 0 30px;
  margin-left: auto;
  justify-self: flex-end;
`

const BodyText = styled(Body)`
  margin: 0;
  margin-right: ${({ theme }) => theme.space.content}px;
`

const List: React.SFC<ListProps> = ({ items, fullWidth }) => (
  <>
    {items.map(({ title, photo, description, onClick }, index) => (
      <Container onClick={onClick} fullWidth={fullWidth} key={index}>
        {photo && (
          <ImageContainer>
            {typeof photo === "string" ? <img alt={title || description} src={photo} /> : photo}
          </ImageContainer>
        )}
        <BodyText>{description}</BodyText>
        {onClick && <StyledIcon right size={21} />}
      </Container>
    ))}
  </>
)

export default List
