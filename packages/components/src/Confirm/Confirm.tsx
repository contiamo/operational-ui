import * as React from "react"
import styled, { keyframes } from "react-emotion"
import { Card } from "../"
import { Props as ButtonProps } from "../Button/Button"
import { OperationalStyleConstants } from "../utils/constants"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const fromBottom = keyframes`
  0% {
    top: -150%
  }

  100% {
    top: 0
  }
`

const Overlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.2s ease-in;
  z-index: ${({ theme }: { theme?: OperationalStyleConstants }) => theme.zIndex.confirm};
`

const Modal = styled(Card)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  animation: ${fromBottom} 0.2s;
  min-width: 600px;
  min-height: 200px;
  z-index: ${({ theme }: { theme?: OperationalStyleConstants }) => theme.zIndex.confirm + 1};
`

const Actions = styled("div")`
  text-align: right;
  position: absolute;
  bottom: 20px;
  right: 20px;
`

export interface ConfirmOptions {
  title: React.ReactNode
  body: React.ReactNode
  cancelButton?: React.ReactElement<ButtonProps>
  actionButton?: React.ReactElement<ButtonProps>
  onConfirm?: () => void
  onCancel?: () => void
}

export type ConfirmState = Readonly<Partial<ConfirmOptions> & { isOpen: boolean }>

export interface ConfirmProps {
  children: (confirm: (options: ConfirmOptions) => void) => React.ReactNode
}

export class Confirm extends React.Component<ConfirmProps, ConfirmState> {
  state: ConfirmState = {
    isOpen: false,
  }

  openConfirm = (options: ConfirmOptions) => {
    this.setState({ ...options, isOpen: true })
  }

  closeConfirm = () => {
    this.setState({ isOpen: false })
  }

  onCancelClick = () => {
    this.state.onCancel && this.state.onCancel()
    this.closeConfirm()
  }

  onActionClick = () => {
    this.state.onConfirm && this.state.onConfirm()
    this.closeConfirm()
  }

  render() {
    const { children } = this.props
    const { isOpen, title, body, cancelButton, actionButton } = this.state

    return (
      <>
        {isOpen && (
          <Modal title={title}>
            {body}
            <Actions>
              {React.cloneElement(cancelButton, { onClick: this.onCancelClick })}
              {React.cloneElement(actionButton, { onClick: this.onActionClick })}
            </Actions>
          </Modal>
        )}
        {children(this.openConfirm)}
        {isOpen && <Overlay onClick={this.onCancelClick} />}
      </>
    )
  }
}

export default Confirm
