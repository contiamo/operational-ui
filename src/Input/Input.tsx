import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { Hint, Icon, IconName } from "../"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts
import { DefaultProps } from "../types"
import { FormFieldControl, FormFieldControls, FormFieldError, inputFocus, Label, LabelText } from "../utils/mixins"
import styled from "../utils/styled"

export interface Props extends DefaultProps {
  className?: string
  /** Text displayed when the input field has no value. */
  placeholder?: string
  /** The name used to refer to the input, for forms. */
  name?: string
  /** The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */
  value?: string
  id?: string
  /** Specifies the id that should be used when hooking up label for attributes with input id attributes, if a label is present. */
  labelId?: string
  /** Label text, rendering the input inside a tag if specified. The `labelId` props is responsible for specifying for and id attributes. */
  label?: string
  inputRef?: (node: any) => void
  /** Callback called when the input changes, with the new value as a string. This is used to update the value in the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */
  onChange?: (newVal: string) => void
  /** Focus handler */
  onFocus?: (ev: any) => void
  /** Blur handler */
  onBlur?: (ev: any) => void
  type?: string
  children?: string
  autoComplete?: string
  /** Automatically focus the input on page load */
  autoFocus?: boolean
  error?: string
  hint?: string
  /** Disabled input */
  disabled?: boolean
  /** Should the input fill its container? */
  fullWidth?: boolean
  onToggle?: () => void
}

interface PropsWithCopy extends Props {
  copy: true
  onIconClick?: never
  icon?: never
}

interface PropsWithoutCopy extends Props {
  copy?: false
  /** Icon to display in an adjacent icon button */
  icon?: IconName
  /** Click handler on the icon */
  onIconClick?: () => void
}

// Rendered height taking into account paddings, font-sizes and line-height
const inputHeight = 36

const InputFieldContainer = styled("div")<{
  fullWidth: Props["fullWidth"]
  withLabel?: boolean
}>`
  position: relative;
  align-items: center;
  justify-content: center;
  ${({ fullWidth, withLabel, theme }) => `
    margin-right: ${withLabel ? 0 : theme.space.small}px;
    display: ${withLabel ? "flex" : "inline-flex"};
    min-width: ${fullWidth ? "100%" : 360};
  `};
`

const InputButton = styled("div")`
  width: ${inputHeight}px;
  height: ${inputHeight}px;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
    background-color: ${theme.color.background.lighter};
    border-top-left-radius: ${theme.borderRadius}px;
    border-bottom-left-radius: ${theme.borderRadius}px;
    border: 1px solid;
    border-color: ${theme.color.border.default};
    color: ${theme.color.text.light};
  `};
`

const InputField = styled("input")<{
  disabled: boolean
  isStandalone: boolean
  isError: boolean
  withIconButton: boolean
}>(({ theme, disabled, isError, withIconButton }) => ({
  ...(withIconButton
    ? { borderTopRightRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius, marginLeft: -1 }
    : { borderRadius: theme.borderRadius }),
  fontSize: theme.font.size.body,
  height: inputHeight,
  label: "input",
  flexGrow: 1,
  padding: "8px 12px",
  opacity: disabled ? 0.6 : 1.0,
  font: "inherit",
  border: "1px solid",
  borderColor: isError ? theme.color.error : theme.color.border.default,
  WebkitAppearance: "none",
  "&:focus": inputFocus({
    theme,
    isError,
  }),
}))

export const initialState = {
  showTooltip: false,
}

export type State = Readonly<typeof initialState>

class Input extends React.Component<PropsWithoutCopy | PropsWithCopy, State> {
  public readonly state = initialState
  public timeoutId: number | null = null

  public showTooltip = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.setState(() => ({ showTooltip: true }))

    this.timeoutId = window.setTimeout(() => {
      this.setState(() => ({ showTooltip: false }))
      this.timeoutId = null
    }, 1000)
  }

  public getButtonElement = () => {
    if (!this.props.icon && !this.props.copy) {
      return null
    }

    return this.props.copy ? (
      <CopyToClipboard text={this.props.value || ""} onCopy={this.showTooltip}>
        <InputButton>
          {this.state.showTooltip && <Tooltip left>Copied!</Tooltip>}
          <Icon name="Copy" size={16} />
        </InputButton>
      </CopyToClipboard>
    ) : (
      <InputButton onClick={this.props.onIconClick}>
        {typeof this.props.icon === "string" ? <Icon name={this.props.icon} size={16} /> : this.props.icon}
      </InputButton>
    )
  }

  public render() {
    const props = this.props

    const forAttributeId = props.label && props.labelId
    const commonInputProps = {
      innerRef: props.inputRef,
      autoFocus: props.autoFocus,
      name: props.name,
      disabled: Boolean(props.disabled),
      value: props.value || "",
      isStandalone: !Boolean(props.label),
      type: props.type,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      placeholder: props.placeholder,
      isError: Boolean(props.error),
      onChange: (e: any) => {
        if (props.onChange) {
          props.onChange(e.target.value)
        }
      },
    }

    const withIconButton = Boolean(props.icon && props.onIconClick) || Boolean(props.copy)
    const inputButtonElement = this.getButtonElement()

    if (props.label) {
      return (
        <Label fullWidth={props.fullWidth} id={props.id} htmlFor={forAttributeId} className={props.className} left>
          <LabelText>{props.label}</LabelText>
          {(props.hint || props.onToggle) && (
            <FormFieldControls>
              {props.hint && <Hint>{props.hint}</Hint>}
              {props.onToggle ? (
                <FormFieldControl
                  onClick={() => {
                    if (props.onToggle) {
                      props.onToggle()
                    }
                  }}
                >
                  <Icon name={props.disabled ? "Lock" : "Unlock"} size={12} />
                </FormFieldControl>
              ) : null}
            </FormFieldControls>
          )}
          <InputFieldContainer fullWidth={props.fullWidth} withLabel>
            {inputButtonElement}
            <InputField
              {...commonInputProps}
              id={forAttributeId}
              autoComplete={props.autoComplete}
              withIconButton={withIconButton}
            />
          </InputFieldContainer>
          {props.error ? <FormFieldError>{props.error}</FormFieldError> : null}
        </Label>
      )
    }

    return (
      <InputFieldContainer fullWidth={props.fullWidth}>
        {inputButtonElement}
        <InputField
          {...commonInputProps}
          id={props.id}
          className={props.className}
          autoComplete={props.autoComplete}
          withIconButton={withIconButton}
        />
      </InputFieldContainer>
    )
  }
}

export default Input
