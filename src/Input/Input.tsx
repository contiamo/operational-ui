import * as React from "react"

import Hint from "../Hint/Hint"
import { LabelText } from "../LabelText/LabelText"
import { DefaultInputProps, DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import { FormFieldControl, FormFieldControls, Label } from "../utils/mixins"
import InputField from "./Input.Field"
import { LockIcon, UnlockIcon, IconComponentType } from "../Icon"

// The `any` here relates to the onChange prop that we omit in favor of our own
export interface BaseProps extends DefaultProps, DefaultInputProps, Omit<React.InputHTMLAttributes<any>, "onChange"> {
  /** The ID for this element, for accessibility et al */
  id?: string
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
  inputRef?: React.RefObject<HTMLInputElement>
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
  /** An alternative element in which to render errors */
  errorComponent?: React.FC<{ errorMessage: string }>
  /** Is the input read-only? */
  readOnly?: boolean
  /** Should this input get Id input style */
  isUniqueId?: boolean
  /** Status icon on the right side of the Input */
  statusIcon?: React.ReactNode
  /** Inline icon on the right side inside the placeholder */
  placeholderIcon?: React.ReactNode
}

export interface BasePropsWithCopy extends BaseProps {
  copy: true
  onIconClick?: never
  icon?: never
}

export interface BasePropsWithoutCopy extends BaseProps {
  copy?: false
  /** Icon to display in an adjacent icon button */
  icon?: IconComponentType | React.ReactNode
  /** Click handler on the icon */
  onIconClick?: () => void
}

export type InputProps = BasePropsWithCopy | BasePropsWithoutCopy

const Input: React.FC<InputProps> = ({
  id,
  tabIndex,
  fullWidth,
  label,
  labelId,
  hint,
  onToggle,
  disabled,
  errorComponent,
  isUniqueId,
  statusIcon,
  placeholderIcon,
  ...props
}) => {
  const uniqueId = useUniqueId(id)

  const Field = (
    <InputField
      hint={hint}
      tabIndex={tabIndex}
      label={label}
      id={uniqueId}
      fullWidth={fullWidth}
      disabled={disabled}
      aria-labelledby={label ? `input-label-${uniqueId}` : undefined}
      aria-describedby={hint ? `input-hint-${uniqueId}` : undefined}
      aria-label={label}
      errorComponent={errorComponent}
      isUniqueId={isUniqueId}
      statusIcon={statusIcon}
      placeholderIcon={placeholderIcon}
      {...props}
    />
  )

  if (label) {
    return (
      <Label fullWidth={fullWidth} id={uniqueId ? `input-label-${uniqueId}` : `input-label-${label}`}>
        <LabelText>{label}</LabelText>
        {(hint || onToggle) && (
          <FormFieldControls>
            {hint && <Hint textId={`input-hint-${uniqueId}`}>{hint}</Hint>}
            {onToggle && (
              <FormFieldControl
                onClick={() => {
                  if (onToggle) {
                    onToggle()
                  }
                }}
              >
                {disabled ? <LockIcon size={12} /> : <UnlockIcon size={12} />}
              </FormFieldControl>
            )}
          </FormFieldControls>
        )}
        {Field}
      </Label>
    )
  }

  return Field
}

export default Input
