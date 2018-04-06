import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import Icon from "./Icon"
import Tooltip from "./Tooltip"
import { Label, LabelText, inputFocus } from "./utils/mixins"
import { inputDefaultWidth } from "./constants"

export interface Props {
  css?: {}
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
    isError
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
    padding: theme.spacing * 2 / 3,
    border: "1px solid",
    opacity: disabled ? 0.6 : 1.0,
    borderColor: isError ? theme.colors.error : "rgb(208, 217, 229)",
    font: "inherit",
    borderRadius: 4,
    WebkitAppearance: "none",
    "&:focus": inputFocus({ theme, isError })
  })
)

const Error = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.small,
  color: theme.colors.error,
  padding: `${theme.spacing / 6}px ${theme.spacing * 3 / 4}px`,
  marginTop: theme.spacing / 6,
  marginBottom: 0,
  width: "100%",
  borderRadius: 3,
  position: "absolute",
  backgroundColor: lighten(theme.colors.error, 45),
  boxShadow: theme.shadows.card,
  bottom: -28,
  left: 0
}))

const HintContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  verticalAlign: "middle",
  display: "inline-block",
  width: "fit-content",
  marginLeft: 4,
  "& svg": {
    opacity: 0.4
  }
}))

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
    }
  }
  if (props.label) {
    return (
      <Label id={props.id} htmlFor={forAttributeId} css={props.css} className={props.className}>
        <LabelText>{props.label}</LabelText>
        {props.hint ? (
          <HintContainer>
            <Icon name="HelpCircle" size={14} />
            <Tooltip right css={{ minWidth: 100, width: "fit-content" }}>
              {props.hint}
            </Tooltip>
          </HintContainer>
        ) : null}
        <InputField
          {...commonInputProps}
          id={forAttributeId}
          autoComplete={props.autoComplete}
          css={{ display: "block", width: "100%" }}
        />
        {props.error ? <Error>{props.error}</Error> : null}
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
