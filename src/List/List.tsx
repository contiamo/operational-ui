import * as React from "react"

import Icon from "../Icon/Icon"
import Body from "../Typography/Body"
import styled from "../utils/styled"

export interface ListProps {
  items: Array<{
    title?: string
    photo: string
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

  :not(:last-child) {
    border-bottom: 0;
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

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.color.border.default};
  width: 24px;
  flex: 0 0 30px;
  margin-left: auto;
  justify-self: flex-end;
`

const List: React.SFC<ListProps> = ({ items, fullWidth }) => (
  <>
    {items.map(({ title, photo, description, onClick }, index) => (
      <Container onClick={onClick} fullWidth={fullWidth} key={index}>
        {photo && (
          <ImageContainer>
            <img alt={title || description} src={photo} />
          </ImageContainer>
        )}
        <Body style={{ margin: 0 }}>{description}</Body>
        {onClick && <StyledIcon right size={21} name="ChevronRight" />}
      </Container>
    ))}
  </>
)

export default List
