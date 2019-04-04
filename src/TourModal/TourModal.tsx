import * as React from "react"

import Button from "../Button/Button"
import Card from "../Card/Card"
import Overlay from "../Internals/Overlay"
import styled from "../utils/styled"

export interface TourModalProps {
  onQuit?: () => void
  onContinue: () => void
  isLast?: boolean
  center?: boolean
  image?: React.ReactNode
}

const Actions = styled("div")<{ center: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Container = styled(Card)<{ center: boolean }>`
  position: fixed;
  padding: ${({ theme }) => theme.space.content}px;
  top: ${({ center }) => (center ? "50%" : "auto")};
  right: ${({ center }) => (center ? 0 : "40px")};
  bottom: ${({ center }) => (center ? "auto" : "40px")};
  left: ${({ center }) => (center ? 0 : "auto")};
  margin: ${({ center }) => (center ? "0 auto" : 0)};
  transform: ${({ center }) => (center ? "translateY(-50%)" : "none")};
  z-index: ${({ theme }) => theme.zIndex.modal};
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.32);
  max-width: ${({ center }) => (center ? 767 : 465)}px;
`

const Content = styled("div")`
  display: flex;
`

const LeftColumn = styled("div")`
  width: 30%;
  height: auto;
  max-width: 175px;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
  margin-right: ${({ theme }) => theme.space.element}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ChildrenContainer = styled("div")`
  width: 100%;
`

const TourOverlay = styled(Overlay)`
  opacity: 0.4;
  animation: none;
`

const TourModal: React.FC<TourModalProps> = ({ center, image, children, onQuit, onContinue, isLast }) => {
  const QuitButton = <Button onClick={onQuit}>Quit the Tour</Button>

  return (
    <>
      <TourOverlay />
      <Container data-cy="operational-ui-TourModal" center={center || false}>
        <Content>
          {image && (
            <LeftColumn>
              {image}
              {center && onQuit && QuitButton}
            </LeftColumn>
          )}
          <ChildrenContainer>
            {children}

            <Actions center={center || false}>
              {!center && onQuit && QuitButton}
              {onContinue && (
                <Button onClick={onContinue} color="primary">
                  {isLast ? "Finish" : "Continue"}
                </Button>
              )}
            </Actions>
          </ChildrenContainer>
        </Content>
      </Container>
    </>
  )
}

export default TourModal
