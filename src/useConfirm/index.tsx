import * as React from "react"
import Button, { ButtonProps } from "../Button/Button"
import styled from "../utils/styled"
import ControlledModal from "../Internals/ControlledModal"

export interface ConfirmBodyProps<T> {
  setConfirmState: (state?: Partial<T>) => void
  confirmState: T
}

export interface ConfirmOptions<T> {
  title: React.ReactNode
  body: React.ReactNode | React.ComponentType<ConfirmBodyProps<T>>
  fullSize?: boolean
  cancelButton?: React.ReactElement<ButtonProps> | ((confirmState?: T) => React.ReactElement<ButtonProps>) | null
  actionButton?: React.ReactElement<ButtonProps> | ((confirmState?: T) => React.ReactElement<ButtonProps>) | null
  onConfirm?: (confirmState?: T) => void
  onCancel?: (confirmState?: T) => void
  state?: T
  /**
   * Prevent closing the modal on overlay click if it's specify to `false`
   *
   * @default true
   */
  closeOnOverlayClick?: boolean
}

const actionsBarSize = 36

function isBodyAFunction<T>(
  component: ConfirmOptions<T>["body"],
): component is React.ComponentType<ConfirmBodyProps<T>> {
  return typeof component === "function"
}

export const Actions = styled.div`
  margin-top: ${({ theme }) => theme.space.element}px;
  align-self: flex-start;
  height: ${actionsBarSize}px;
  display: flex;
  flex-direction: row-reverse;
`

export const ControlledModalContent = styled.div<{ fullSize: boolean }>(({ fullSize, theme }) => ({
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

export const useConfirm = <T, P = ConfirmOptions<T>>() => {
  const [options, setOptions] = React.useState<Partial<ConfirmOptions<T>>>({})

  const openConfirm = React.useCallback(
    (options: P) => {
      setOptions(options)
    },
    [setOptions],
  )

  const closeConfirm = React.useCallback(() => {
    setOptions({})
  }, [setOptions])

  const onCancelClick = React.useCallback(() => {
    const { onCancel, state } = options

    if (onCancel) {
      onCancel(state)
    }

    closeConfirm()
  }, [options, closeConfirm])

  const onActionClick = React.useCallback(() => {
    const { onConfirm, state } = options

    if (onConfirm) {
      onConfirm(state)
    }

    closeConfirm()
  }, [options, closeConfirm])

  const setConfirmState: ConfirmBodyProps<T>["setConfirmState"] = React.useCallback(
    state => {
      setOptions(prevOptions => ({
        ...prevOptions,
        state: { ...prevOptions.state, ...state } as T,
      }))
    },
    [setOptions],
  )

  const Placeholder: React.FC<{}> = React.useCallback(() => {
    const { actionButton, fullSize, title, cancelButton, state, body: Body, closeOnOverlayClick } = options
    const isOpen = Boolean(Body)

    return (
      <>
        {isOpen && (
          <ControlledModal
            type="confirm"
            fullSize={fullSize}
            title={title}
            onClose={closeConfirm}
            closeOnOverlayClick={closeOnOverlayClick}
          >
            <ControlledModalContent fullSize={Boolean(fullSize)}>
              {isBodyAFunction(Body) && state ? <Body setConfirmState={setConfirmState} confirmState={state} /> : Body}
            </ControlledModalContent>
            <Actions data-cy="confirm__actions">
              {cancelButton !== null &&
                React.cloneElement(
                  typeof cancelButton === "function" ? cancelButton(state) : cancelButton || <Button>Cancel</Button>,
                  {
                    onClick: onCancelClick,
                  },
                )}
              {actionButton !== null &&
                React.cloneElement(
                  typeof actionButton === "function"
                    ? actionButton(state)
                    : actionButton || <Button color="success">Confirm</Button>,
                  {
                    onClick: onActionClick,
                  },
                )}
            </Actions>
          </ControlledModal>
        )}
      </>
    )
  }, [options, closeConfirm, onCancelClick, onActionClick, setConfirmState])

  return [openConfirm, Placeholder] as const
}
