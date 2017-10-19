import * as React from "react"
import glamorous from "glamorous"

type Props = {
  css?: any
  className?: string
  placeholder?: string
  name?: string
  value: string
  id?: string
  label?: string
  inputRef?: (node: any) => void
  onChange?: (newVal: string) => void
  onFocus?: (ev: any) => void
  onBlur?: (ev: any) => void
  children?: string
}

type StyleProps = {
  theme: Theme
}

const Label = glamorous.label(({ theme }: { theme: Theme }) => ({
  "& > span": {
    ...theme.typography.body,
    display: "inline-block",
    marginBottom: theme.spacing / 3
  }
}))

const InputField = glamorous.input(({ theme }: StyleProps) => ({
  padding: theme.spacing / 2,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  font: "inherit",
  WebkitAppearance: "none"
}))

const Input: React.SFC<Props> = ({
  css,
  className,
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  inputRef
}) => {
  const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
  return (
    <Label htmlFor={domId}>
      {label && <span>{label}</span>}
      {label && <br />}
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
    </Label>
  )
}

export default Input
