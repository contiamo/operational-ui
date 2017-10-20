import * as React from "react"
import glamorous from "glamorous"

import withLabel from "../../utils/with-label"

interface IProps {
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

const InputField = glamorous.input(({ theme }: { theme: Theme }) => ({
  minWidth: 180,
  padding: theme.spacing / 2,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  font: "inherit",
  WebkitAppearance: "none"
}))

const Input = ({
  css,
  className,
  label,
  domId,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  inputRef
}: IProps) => {
  return (
    <InputField
      css={css}
      innerRef={inputRef}
      className={className}
      id={domId}
      name={name}
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(e: any) => {
        onChange && onChange(e.target.value)
      }}
    />
  )
}

export default withLabel(Input)
