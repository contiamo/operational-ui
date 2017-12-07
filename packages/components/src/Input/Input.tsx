import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import withLabel from "../utils/with-label"

export interface IProps {
  css?: any
  className?: string
  placeholder?: string
  name?: string
  value: string
  id?: string
  // Injected by withLabel higher-order component
  domId?: string
  label?: string
  inputRef?: (node: any) => void
  onChange?: (newVal: string) => void
  disabled?: boolean
  onFocus?: (ev: any) => void
  onBlur?: (ev: any) => void
  children?: string
}

const Label = glamorous.label(({ theme }: { theme: Theme }) => ({
  "& > span": {
    ...theme.typography.body,
    display: "inline-block",
    marginBottom: theme.spacing / 4
  }
}))

const InputField = glamorous.input(({ theme, disabled }: { theme: Theme; disabled: boolean }) => ({
  minWidth: 200,
  padding: theme.spacing * 2 / 3,
  border: "1px solid",
  opacity: disabled ? 0.6 : 1.0,
  borderColor: "rgb(208, 217, 229)",
  font: "inherit",
  borderRadius: 2,
  WebkitAppearance: "none",
  "&:focus": {
    outline: 0,
    borderColor: "rgba(82,168,236,.8)",
    boxShadow: theme.shadows.focus
  }
}))

const Input = (props: IProps) => {
  return (
    <InputField
      key={props.id}
      css={props.css}
      innerRef={props.inputRef}
      className={props.className}
      id={props.domId}
      name={props.name}
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={props.value}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={(e: any) => {
        props.onChange && props.onChange(e.target.value)
      }}
    />
  )
}

export default withLabel(Input)
