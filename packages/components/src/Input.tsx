import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import withLabel from "./utils/with-label"
import * as mixins from "./utils/mixins"

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
  type?: string
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
  label: "inputfield",
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

const Input = (props: IProps) => {
  // `css` and `className` props are not set, as they are set on the wrapped label container.
  // See ./src/utils/with-label.tsx.
  return (
    <InputField
      key={props.id}
      innerRef={props.inputRef}
      id={props.domId}
      name={props.name}
      disabled={props.disabled}
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
}

export default withLabel(Input)
