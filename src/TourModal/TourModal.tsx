import * as React from "react"

import Button from "../Button/Button"
import Card from "../Card/Card"
import Overlay from "../Internals/Overlay"
import SimpleLink from "../SimpleLink/SimpleLink"
import { useHotkey } from "../useHotkey"
import styled from "../utils/styled"

interface TourModalBaseProps {
  /** What happens when a user clicks "continue"? */
  onContinue: () => void
  /** Are we on the last item in the tour? */
  isLast?: boolean
  /** Is this modal center stage? */
  center?: boolean
  /** A picture that will be displayed in center-stage mode */
  image?: React.ReactNode
  /** Text messages for buttons */
  messages?: {
    /** Default: "Quit the Tour" */
    quit: string
    /** Default: "Finish" */
    finish: string
    /** Default: "Continue" */
    continue: string
  }
}

interface TourModalPropsLast extends TourModalBaseProps {
  isLast: true
  onQuit?: never
}

interface TourModalPropsNotLast extends TourModalBaseProps {
  isLast?: false
  /** What happens when the modal closes? */
  onQuit: () => void
}

export type TourModalProps = TourModalPropsLast | TourModalPropsNotLast

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

const TourModal: React.FC<TourModalProps> = ({
  center,
  image,
  children,
  onQuit,
  onContinue,
  isLast,
  messages = { quit: "Quit the Tour", finish: "Finish", continue: "Continue" },
}) => {
  const $body = React.useRef(document.body)
  useHotkey($body, { key: "Escape" }, () => {
    if (onQuit && !isLast) {
      onQuit()
    }
  })

  return (
    <>
      <TourOverlay />
      <Container data-cy="operational-ui-TourModal" center={center || false}>
        <Content>
          {image && (
            <LeftColumn>
              {image}
              {center && onQuit && <SimpleLink onClick={onQuit}>{messages.quit}</SimpleLink>}
            </LeftColumn>
          )}
          <ChildrenContainer>
            {children}

            <Actions center={center || false}>
              {!center && onQuit && <Button onClick={onQuit}>{messages.quit}</Button>}
              {onContinue && (
                <Button aria-label={isLast ? messages.finish : messages.continue} onClick={onContinue} color="primary">
                  {isLast ? messages.finish : messages.continue}
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
