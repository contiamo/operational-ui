import * as React from "react"
import styled, { keyframes } from "react-emotion"
import Card from "../Card/Card"
import { Props as ButtonProps } from "../Button/Button"
import { OperationalStyleConstants } from "../utils/constants"
import Overlay from "../Internals/Overlay"

const fromBottom = keyframes`
  0% {
    top: -10px
  }

  100% {
    top: 0
  }
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

export interface State {
  options?: ConfirmOptions
}

export interface Props {
  children: (confirm: (options: ConfirmOptions) => void) => React.ReactNode
}

export class Confirm extends React.Component<Props, Readonly<State>> {
  readonly state: State = {
    options: undefined,
  }

  openConfirm = (options: ConfirmOptions) => {
    this.setState({ options })
  }

  closeConfirm = () => {
    this.setState({ options: undefined })
  }

  onCancelClick = () => {
    this.state.options.onCancel && this.state.options.onCancel()
    this.closeConfirm()
  }

  onActionClick = () => {
    this.state.options.onConfirm && this.state.options.onConfirm()
    this.closeConfirm()
  }

  render() {
    const { children } = this.props
    const isOpen = Boolean(this.state.options)

    if (isOpen) {
      const { title, body, cancelButton, actionButton } = this.state.options
      return (
        <>
          <Modal title={title}>
            {body}
            <Actions>
              {React.cloneElement(cancelButton, { onClick: this.onCancelClick })}
              {React.cloneElement(actionButton, { onClick: this.onActionClick })}
            </Actions>
          </Modal>
          {children(this.openConfirm)}
          <Overlay onClick={this.onCancelClick} />
        </>
      )
    }

    return children(this.openConfirm)
  }
}

export default Confirm
