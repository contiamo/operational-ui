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

const InputField = glamorous.input(({ theme, disabled }: { theme: Theme; disabled: boolean }): {} => ({
  ...theme.typography.body,
  label: "input",
  width: "100%",
  minWidth: 200,
  padding: theme.spacing * 2 / 3,
  border: "1px solid",
  opacity: disabled ? 0.6 : 1.0,
  borderColor: "rgb(208, 217, 229)",
  font: "inherit",
  borderRadius: 2,
  WebkitAppearance: "none",
  "&:focus": mixins.inputFocus({ theme })
}))

const Input = (props: Props) => {
  // @todo - give sensible dom id when one is not supplied
  const domId = props.id
  const inputElement = (
    <InputField
      css={props.css}
      className={props.className}
      key={props.id}
      innerRef={props.inputRef}
      id={domId}
      name={props.name}
      disabled={Boolean(props.disabled)}
      placeholder={props.placeholder}
      value={props.value}
      type={props.type}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={(e: any) => {
        props.onChange && props.onChange(e.target.value)
      }}
    />
  )
  if (props.label) {
    return (
      <Label htmlFor={domId}>
        {props.label}
        {inputElement}
      </Label>
    )
  }
  return inputElement
}

export default Input
