import * as React from "react"
import glamorous, { CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import Icon from "./Icon"
import Tooltip from "./Tooltip"
import { Label, LabelText, inputFocus, FormFieldControls, FormFieldControl, FormFieldError } from "./utils/mixins"
import { inputDefaultWidth } from "./constants"

export interface Props {
  css?: CSSProperties
  className?: string
  placeholder?: string
  name?: string
  value?: string
  id?: string
  labelId?: string
  label?: string
  inputRef?: (node: any) => void
  onChange?: (newVal: string) => void
  onFocus?: (ev: any) => void
  onBlur?: (ev: any) => void
  type?: string
  children?: string
  autoComplete?: string
  error?: string
  hint?: string
  disabled?: boolean
  onToggle?: () => void
}

const InputField = glamorous.input(
  ({
    theme,
    disabled,
    isStandalone,
    isError,
  }: {
    theme: Theme
    disabled: boolean
    isStandalone: boolean
    isError: boolean
  }): {} => ({
    ...theme.typography.body,
    // If the input field is standalone without a label, it should not specify any display properties
    // to avoid input fields that span the screen. Min width should take care of presentable
    // default looks.
    ...isStandalone ? {} : { display: "block" },
    label: "input",
    minWidth: inputDefaultWidth,
    padding: `${theme.spacing / 2}px ${theme.spacing * 2 / 3}px`,
    border: "1px solid",
    opacity: disabled ? 0.6 : 1.0,
    borderColor: isError ? theme.colors.error : theme.colors.inputBorder,
    font: "inherit",
    borderRadius: theme.borderRadius,
    WebkitAppearance: "none",
    "&:focus": inputFocus({ theme, isError }),
  })
)

const Input = (props: Props) => {
  const forAttributeId = props.label && props.labelId
  const commonInputProps = {
    innerRef: props.inputRef,
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
      props.onChange && props.onChange(e.target.value)
    },
  }
  if (props.label) {
    return (
      <Label id={props.id} htmlFor={forAttributeId} css={props.css} className={props.className}>
        <LabelText>{props.label}</LabelText>
        <FormFieldControls>
          {props.hint ? (
            <FormFieldControl>
              <Icon name="HelpCircle" size={14} />
              <Tooltip right css={{ minWidth: 100, width: "fit-content" }}>
                {props.hint}
              </Tooltip>
            </FormFieldControl>
          ) : null}
          {props.onToggle ? (
            <FormFieldControl
              onClick={() => {
                props.onToggle()
              }}
            >
              <Icon name={props.disabled ? "Lock" : "Unlock"} size={12} />
            </FormFieldControl>
          ) : null}
        </FormFieldControls>
        <InputField
          {...commonInputProps}
          id={forAttributeId}
          autoComplete={props.autoComplete}
          css={{ display: "block", width: "100%" }}
        />
        {props.error ? <FormFieldError>{props.error}</FormFieldError> : null}
      </Label>
    )
  }
  return (
    <InputField
      {...commonInputProps}
      id={props.id}
      css={props.css}
      className={props.className}
      autoComplete={props.autoComplete}
    />
  )
}

export default Input
