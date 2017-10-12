import * as React from "react"
import glamorous from "glamorous"

type Props = {
  className?: string
  placeholder?: string
  name?: string
  value: string
  inputRef?: (node: any) => void
  onChange?: (newVal: string) => void
  onFocus?: (ev: any) => void
  onBlur?: (ev: any) => void
  children?: string
}

type StyleProps = {
  theme: Theme
}

const StyledInput = glamorous.input(({ theme }: StyleProps) => ({
  padding: theme.spacing / 2,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  font: "inherit",
  WebkitAppearance: "none"
}))

const Input: React.SFC<Props> = ({ className, name, placeholder, value, onChange, onFocus, onBlur, inputRef }) => {
  return (
    <StyledInput
      innerRef={inputRef}
      className={className}
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

export default Input
