import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import Hint from "../Hint/Hint"
import Icon, { IconName } from "../Icon/Icon"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts
import { DefaultProps } from "../types"
import { setAlpha } from "../utils"
import { FormFieldControl, FormFieldControls, FormFieldError, inputFocus, Label, LabelText } from "../utils/mixins"
import styled from "../utils/styled"

export interface BaseProps extends DefaultProps {
  /** Text displayed when the input field has no value. */
  placeholder?: string
  /** The name used to refer to the input, for forms. */
  name?: string
  /** The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */
  value?: string
  /** Specifies the id that should be used when hooking up label for attributes with input id attributes, if a label is present. */
  labelId?: string
  /** Label text, rendering the input inside a tag if specified. The `labelId` props is responsible for specifying for and id attributes. */
  label?: string
  inputRef?: (node: any) => void
  /**
   * Callback called when the input changes, with the new value as a string.
   * This is used to update the value in the parent component,
   * as per https://facebook.github.io/react/docs/forms.html#controlled-components.
   */
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
  /** Do we have a preset value? */
  preset?: boolean
  /** Clear the input */
  clear?: () => void
}

export interface BasePropsWithCopy extends BaseProps {
  copy: true
  onIconClick?: never
  icon?: never
}

export interface BasePropsWithoutCopy extends BaseProps {
  copy?: false
  /** Icon to display in an adjacent icon button */
  icon?: IconName | React.ReactNode
  /** Click handler on the icon */
  onIconClick?: () => void
}

export type InputProps = BasePropsWithCopy | BasePropsWithoutCopy

// Rendered height taking into account paddings, font-sizes and line-height
const inputHeight = 36
const inputWidth = 360

const InputFieldContainer = styled("div")<{
  fullWidth: InputProps["fullWidth"]
  withLabel?: boolean
}>`
  position: relative;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-width: ${inputWidth}px;
  ${({ fullWidth, withLabel, theme }) => `
    margin-right: ${withLabel ? 0 : theme.space.small}px;
    display: ${withLabel ? "flex" : "inline-flex"};
    width: 100%;
    max-width: ${fullWidth ? "none" : `${inputWidth}px`};
  `};
`

const InputButton = styled("div")`
  width: ${inputHeight}px;
  /** Makes sure the button doesn't shrink when inside a flex container */
  flex: 0 0 ${inputHeight}px;
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
    &:hover {
      background-color: ${theme.color.background.light};
    }
  `};
`

const InputField = styled("input")<{
  isError: boolean
  withIconButton: boolean
  preset: InputProps["preset"]
  disabled: InputProps["disabled"]
  clear: InputProps["clear"]
}>(({ theme, disabled, isError, withIconButton, preset, clear }) => ({
  ...(withIconButton
    ? { borderTopRightRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius, marginLeft: -1 }
    : { borderRadius: theme.borderRadius }),
  fontSize: theme.font.size.body,
  width: "100%", // The clear button is 40px
  height: inputHeight,
  label: "input",
  flexGrow: 1,
  padding: `${theme.space.small}px ${theme.space.medium}px`,
  opacity: disabled ? 0.6 : 1.0,
  font: "inherit",
  border: "1px solid",
  borderColor: isError ? theme.color.error : theme.color.border.default,
  appearance: "none",
  fontWeight: preset ? theme.font.weight.medium : theme.font.weight.regular,
  color: preset ? theme.color.text.dark : theme.color.text.default,
  backgroundColor: preset ? setAlpha(0.1)(theme.color.primary) : "initial",
  ...(clear ? { paddingRight: 40 } : {}),
  "&:focus": inputFocus({
    theme,
    isError,
  }),
}))

const ClearButton = styled("div")`
  position: absolute;
  top: 0; /* anchor the position to the top so the browser doesn't guess */
  right: 0; /* not 12px but 0 because we want a _box_ to attach to the end of Input and not just an X pushed in from the right */

  /* We also probably should specify the dimensions of this box */
  width: ${inputHeight}px;
  height: ${inputHeight}px;

  /* Also, let's center the contents of this box */
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer; /* Let the user know this is clickable */

  /* We want the user to click on thix _box_, not the icon inside it */
  > svg {
    pointer-events: none;
  }
`

export const initialState = {
  showTooltip: false,
}

export type State = Readonly<typeof initialState>

class Input extends React.Component<InputProps, State> {
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

  private getButtonElement = () => {
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
        {typeof this.props.icon === "string" ? <Icon name={this.props.icon as IconName} size={16} /> : this.props.icon}
      </InputButton>
    )
  }

  public render() {
    const {
      fullWidth,
      copy,
      icon,
      onIconClick,
      label,
      labelId,
      inputRef,
      autoFocus,
      name,
      hint,
      autoComplete,
      onToggle,
      disabled,
      value,
      type,
      onFocus,
      onBlur,
      placeholder,
      error,
      onChange,
      preset,
      ...props
    } = this.props

    const forAttributeId = label && labelId
    if (label) {
      return (
        <Label {...props} fullWidth={fullWidth} htmlFor={forAttributeId} left>
          <LabelText>{label}</LabelText>
          {(hint || onToggle) && (
            <FormFieldControls>
              {hint && <Hint>{hint}</Hint>}
              {onToggle ? (
                <FormFieldControl
                  onClick={() => {
                    if (onToggle) {
                      onToggle()
                    }
                  }}
                >
                  <Icon name={disabled ? "Lock" : "Unlock"} size={12} />
                </FormFieldControl>
              ) : null}
            </FormFieldControls>
          )}
          {this.getInputField()}
        </Label>
      )
    }

    return this.getInputField()
  }

  private getInputField = () => {
    const {
      fullWidth,
      copy,
      icon,
      label,
      inputRef,
      autoFocus,
      name,
      autoComplete,
      disabled,
      value,
      type,
      onFocus,
      onBlur,
      placeholder,
      error,
      onChange,
      preset,
      clear,
      labelId,
    } = this.props

    const commonInputProps = {
      innerRef: inputRef,
      autoFocus,
      name,
      disabled: Boolean(disabled),
      value: value || "",
      isStandalone: !Boolean(label),
      type,
      onFocus,
      onBlur,
      placeholder,
      isError: Boolean(error),
      onChange: (ev: React.FormEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(ev.currentTarget.value)
        }
      },
    }

    const forAttributeId = label && labelId
    const withIconButton = Boolean(icon) || Boolean(copy)
    const inputButtonElement = this.getButtonElement()

    return (
      <>
        <InputFieldContainer fullWidth={fullWidth} withLabel>
          {inputButtonElement}
          <InputField
            {...commonInputProps}
            clear={clear}
            preset={Boolean(preset)}
            id={forAttributeId}
            autoComplete={autoComplete}
            withIconButton={withIconButton}
          />
          {this.props.clear &&
            this.props.value && (
              <ClearButton onClick={this.props.clear}>
                <Icon color="color.text.lightest" name="No" />
              </ClearButton>
            )}
        </InputFieldContainer>
        {error ? <FormFieldError>{error}</FormFieldError> : null}
      </>
    )
  }
}

export default Input
