import React from "react"
import { styled, Message, MessageProps } from "@operational/components"
import { keyframes } from "@emotion/react"

const sweep = keyframes({
  "0%": {
    transform: "translateX(-120%)",
  },

  "100%": {
    transform: "translateX(300%)",
  },
})

const rise = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(15px)",
  },

  "100%": {
    opacity: 1,
    transform: "none",
  },
})

const Container = styled(Message)`
  position: relative;
  overflow: hidden;

  > * {
    animation: ${rise.name} 0.8s forwards cubic-bezier(0.8, 0, 0, 0.8);
  }

  ::after {
    content: "";
    display: block;
    width: 400px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    background-color: rgba(255, 255, 255, 0.4);
    animation: ${sweep.name} 2s cubic-bezier(0.7, 0, 0, 0.8) forwards;
  }
`

const ShinyMessage: React.FC<MessageProps> = props => (
  <>
    <Container {...props} />
    <style>
      {sweep.styles}
      {rise.styles}
    </style>
  </>
)

export default ShinyMessage
