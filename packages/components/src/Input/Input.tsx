import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { lighten } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"
import { Icon, Tooltip } from "../"
import { Label, LabelText, inputFocus, FormFieldControls, FormFieldControl, FormFieldError } from "../utils/mixins"
import { inputDefaultWidth } from "../constants"
export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Text displayed when the input field has no value. */

  placeholder?: string
  /** The name used to refer to the input, for forms. */

  name?: string
  /** The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */

  value?: string
  id?: string
  /** Specifies the id that should be used when hooking up label for attributes with input id attributes, if a label is present. */

  labelId?: string
  /** Label text, rendering the input inside a tag if specified. The `labelId` props is responsible for specifying for and id attributes. */

  label?: string
  inputRef?: (node: any) => void
  /** Callback called when the input changes, with the new value as a string. This is used to update the value in the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components. */

  onChange?: (newVal: string) => void
  /** Focus handler */

  onFocus?: (ev: any) => void
  /** Blur handler */

  onBlur?: (ev: any) => void
  type?: string
  children?: string
  autoComplete?: string
  error?: string
  hint?: string
  /** Disabled input */

  disabled?: boolean
  onToggle?: () => void
}
const InputField = styled("input")(
  ({
    theme,
    disabled,
    isStandalone,
    isError,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    disabled: boolean
    isStandalone: boolean
    isError: boolean
  }): CssStatic => ({
    ...theme.deprecated.typography.body,
    // If the input field is standalone without a label, it should not specify any display properties
    // to avoid input fields that span the screen. Min width should take care of presentable
    // default looks.
    ...(isStandalone
      ? {}
      : {
          display: "block",
        }),
    label: "input",
    minWidth: inputDefaultWidth,
    padding: `${theme.deprecated.spacing / 2}px ${(theme.deprecated.spacing * 2) / 3}px`,
    border: "1px solid",
    opacity: disabled ? 0.6 : 1.0,
    borderColor: isError ? theme.deprecated.colors.error : theme.deprecated.colors.inputBorder,
    font: "inherit",
    borderRadius: theme.deprecated.borderRadius,
    WebkitAppearance: "none",
    "&:focus": inputFocus({
      theme,
      isError,
    }),
  }),
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
              <Tooltip
                right
                css={{
                  minWidth: 100,
                  width: "fit-content",
                }}
              >
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
          css={{
            display: "block",
            width: "100%",
          }}
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
