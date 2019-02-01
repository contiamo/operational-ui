import * as React from "react"

import Hint from "../Hint/Hint"
import Icon, { IconName } from "../Icon/Icon"
import { LabelText } from "../LabelText/LabelText"
import { DefaultProps } from "../types"
import { FormFieldControl, FormFieldControls, Label } from "../utils/mixins"
import InputField from "./Input.Field"

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
  onFocus?: (ev: React.FormEvent<HTMLInputElement>) => void
  /** Blur handler */
  onBlur?: (ev: React.FormEvent<HTMLInputElement>) => void
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

const Input: React.SFC<InputProps> = ({ fullWidth, label, labelId, hint, onToggle, disabled, ...props }) => {
  const forAttributeId = label && labelId
  const Field = <InputField fullWidth={fullWidth} disabled={disabled} {...props} />

  if (label) {
    return (
      <Label fullWidth={fullWidth} htmlFor={forAttributeId}>
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
        {Field}
      </Label>
    )
  }

  return Field
}

export default Input
