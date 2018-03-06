import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import * as mixins from "./utils/mixins"

export interface Props {
  css?: {}
  className?: string
  placeholder?: string
  name?: string
  value: string
  id?: string
  inputId?: string
  label?: string
  inputRef?: (node: any) => void
  onChange?: (newVal: string) => void
  disabled?: boolean
  onFocus?: (ev: any) => void
  onBlur?: (ev: any) => void
  type?: string
  children?: string
}

const Label = glamorous.label(mixins.label)

const InputField = glamorous.input(
  ({ theme, disabled, isStandalone }: { theme: Theme; disabled: boolean; isStandalone: boolean }): {} => ({
    ...theme.typography.body,
    // If the input field is standalone without a label, it should not specify any display properties
    // to avoid input fields that span the screen. Min width should take care of presentable
    // default looks.
    ...isStandalone ? {} : { display: "block" },
    label: "input",
    width: "100%",
    minWidth: 240,
    padding: theme.spacing * 2 / 3,
    border: "1px solid",
    opacity: disabled ? 0.6 : 1.0,
    borderColor: "rgb(208, 217, 229)",
    font: "inherit",
    borderRadius: 2,
    WebkitAppearance: "none",
    "&:focus": mixins.inputFocus({ theme })
  })
)

const Input = (props: Props) => {
  // Use label as id if one is not specified
  // so clicking on the label still activates
  // the input field.
  const domId = props.id || props.label
  const commonInputProps = {
    innerRef: props.inputRef,
    id: domId,
    name: props.name,
    disabled: Boolean(props.disabled),
    value: props.value,
    isStandalone: !Boolean(props.label),
    type: props.type,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    placeholder: props.placeholder,
    onChange: (e: any) => {
      props.onChange && props.onChange(e.target.value)
    }
  }
  if (props.label) {
    return (
      <Label htmlFor={domId} css={props.css} className={props.className} key={props.id}>
        {props.label}
        <InputField {...commonInputProps} key={props.id} />
      </Label>
    )
  }
  return <InputField {...commonInputProps} css={props.css} className={props.className} key={props.id} />
}

export default Input
