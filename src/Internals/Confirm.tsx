import * as React from "react"
import Button, { ButtonProps } from "../Button/Button"
import styled from "../utils/styled"
import ControlledModal from "./ControlledModal"

export interface ConfirmBodyProps<T> {
  setConfirmState: (state?: Partial<T>) => void
  confirmState: T
}

export interface ConfirmOptions<T> {
  title: React.ReactNode
  body: React.ReactNode | React.ComponentType<ConfirmBodyProps<T>>
  fullSize?: boolean
  cancelButton?: React.ReactElement<ButtonProps> | ((confirmState: T) => React.ReactElement<ButtonProps>) | null
  actionButton?: React.ReactElement<ButtonProps> | ((confirmState: T) => React.ReactElement<ButtonProps>) | null
  onConfirm?: (confirmState: T) => void
  onCancel?: (confirmState: T) => void
  state?: T
  /**
   * Prevent closing the modal on overlay click if it's specify to `false`
   *
   * @default true
   */
  closeOnOverlayClick?: boolean
}

export interface State<T> {
  options: Partial<ConfirmOptions<T>>
}

export interface Props {
  children: (confirm: <T, P = ConfirmOptions<T>>(options: P) => void) => React.ReactNode
}

const actionsBarSize = 36

function isBodyAFunction<T>(
  component: ConfirmOptions<T>["body"],
): component is React.ComponentType<ConfirmBodyProps<T>> {
  return typeof component === "function"
}

export const Actions = styled("div")`
  margin-top: ${({ theme }) => theme.space.element}px;
  align-self: flex-start;
  height: ${actionsBarSize}px;
  display: flex;
  flex-direction: row-reverse;
`

export const ControlledModalContent = styled("div")<{ fullSize: boolean }>(({ fullSize, theme }) => ({
  label: "ControlledModalContent",

  // Invert control of spacing from Card to Modal
  marginTop: theme.space.element * -1,
  marginLeft: theme.space.element * -1,
  marginRight: theme.space.element * -1,
  padding: theme.space.element,

  ...(fullSize
    ? {
        height: `calc(100% - ${actionsBarSize}px)`,
        overflowY: "auto",
      }
    : {}),
}))

export class Confirm<T> extends React.Component<Props, Readonly<State<T>>> {
  public readonly state: State<T> = {
    options: {},
  }

  private openConfirm = (options: Partial<ConfirmOptions<T>>) => {
    this.setState({ options })
  }

  private closeConfirm = () => {
    this.setState({ options: {} })
  }

  private onCancelClick = () => {
    const { onCancel, state } = this.state.options

    if (onCancel) {
      onCancel(state as T)
    }

    this.closeConfirm()
  }

  private onActionClick = () => {
    const { onConfirm, state } = this.state.options

    if (onConfirm) {
      onConfirm(state as T)
    }

    this.closeConfirm()
  }

  private setConfirmState: ConfirmBodyProps<T>["setConfirmState"] = state => {
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        // No spreading here due to https://github.com/Microsoft/TypeScript/issues/10727
        state: Object.assign({}, prevState.options.state, state),
      },
    }))
  }

  public render() {
    const { actionButton, fullSize, title, cancelButton, state, body: Body, closeOnOverlayClick } = this.state.options
    const isOpen = Boolean(Body)

    return (
      <>
        {this.props.children(this.openConfirm)}
        {isOpen && (
          <ControlledModal
            type="confirm"
            fullSize={fullSize}
            title={title}
            onClose={this.closeConfirm}
            closeOnOverlayClick={closeOnOverlayClick}
          >
            <ControlledModalContent fullSize={Boolean(fullSize)}>
              {isBodyAFunction(Body) && state ? (
                <Body setConfirmState={this.setConfirmState} confirmState={state} />
              ) : (
                Body
              )}
            </ControlledModalContent>
            <Actions data-cy="confirm__actions">
              {cancelButton !== null &&
                React.cloneElement(
                  typeof cancelButton === "function"
                    ? cancelButton(state as T)
                    : cancelButton || <Button>Cancel</Button>,
                  {
                    onClick: this.onCancelClick,
                  },
                )}
              {actionButton !== null &&
                React.cloneElement(
                  typeof actionButton === "function"
                    ? actionButton(state as T)
                    : actionButton || <Button color="success">Confirm</Button>,
                  {
                    onClick: this.onActionClick,
                  },
                )}
            </Actions>
          </ControlledModal>
        )}
      </>
    )
  }
}

export default Confirm
