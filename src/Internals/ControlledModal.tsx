import * as React from "react"
import { keyframes } from "react-emotion"
import Card, { CardProps } from "../Card/Card"
import Overlay from "../Internals/Overlay"
import styled from "../utils/styled"

export interface Props {
  id?: string
  className?: string
  contentClassName?: string
  children: CardProps["children"]
  onClose?: () => void
  title?: CardProps["title"]
  action?: CardProps["action"]
  fullSize?: boolean
}

const fromTop = (fullSize: boolean) => {
  const translateX = fullSize ? 0 : "-50%"
  return keyframes`
  0% {
    transform: translate(${translateX}, -10px)
  }
  100% {
    transform: translate(${translateX}, 0)
  }
`
}

const Container = styled(Card)<Partial<Props>>(({ theme, fullSize }) => ({
  top: theme.space.element,
  left: fullSize ? theme.space.element : "50%",
  height: fullSize ? "100%" : "fit-content",
  animation: `${fromTop(Boolean(fullSize))} 0.2s`,
  position: "absolute",
  minWidth: 600,
  zIndex: theme.zIndex.modal,
  maxWidth: `calc(100% - ${theme.space.element * 2}px)`, // don't go past the screen!

  ...(fullSize
    ? // Full-size specific rules
      {
        border: 0,
        width: 1110,
        display: "grid",
        gridTemplateRows: "40px 100%",
        maxHeight: `calc(100% - ${theme.space.element * 2}px)`,
      }
    : // Regular size rules
      {
        transform: "translate(-50%, 0)",
      }),
}))

const Content = styled("div")<Props>(({ theme, fullSize }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  // Invert control of spacing from Card to Modal
  margin: theme.space.element * -1,
  padding: theme.space.element,

  // Ensure scrollability if content is too long
  ...(fullSize
    ? {
        height: "100%", // height + padding top + padding bottom
        overflow: "auto",
      }
    : {}),
}))

const ControlledModal: React.SFC<Props> = ({
  id,
  className,
  contentClassName,
  onClose,
  fullSize,
  title,
  action,
  children,
}: Props) => (
  <>
    <Overlay id={id} className={className} onClick={onClose} />
    <Container className={contentClassName} fullSize={fullSize} title={title} action={action}>
      <Content fullSize={fullSize}>{children}</Content>
    </Container>
  </>
)

export default ControlledModal
