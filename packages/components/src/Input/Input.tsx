import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Icon, IconName } from "../"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts
import { Label, LabelText, inputFocus, FormFieldControls, FormFieldControl, FormFieldError } from "../utils/mixins"

export interface Props {
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
  /** Icon to display in an adjacent icon button */
  icon?: string
  /** Click handler on the icon */
  onIconClick?: () => void
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

// Rendered height taking into account paddings, font-sizes and line-height
const inputHeight = 36

const InputFieldContainer = styled("div")`
  position: relative;
  min-width: 360px;
  align-items: center;
  justify-content: center;
  ${({ withLabel, theme }: { withLabel?: boolean; theme?: OperationalStyleConstants }) => `
    margin-right: ${withLabel ? 0 : theme.space.small}px;
    display: ${withLabel ? "flex" : "inline-flex"};
  `};
`

const InputButton = styled("div")`
  width: ${inputHeight}px;
  height: ${inputHeight}px;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme?: OperationalStyleConstants }) => `
    background-color: ${theme.color.background.lighter};
    border-top-left-radius: ${theme.borderRadius}px;
    border-bottom-left-radius: ${theme.borderRadius}px;
    border: 1px solid;
    border-color: ${theme.color.border.default};
    color: ${theme.color.text.light};
  `};
`

const InputField = styled("input")(
  ({
    theme,
    disabled,
    isStandalone,
    isError,
    withIconButton,
  }: {
    theme?: OperationalStyleConstants
    disabled: boolean
    isStandalone: boolean
    isError: boolean
    withIconButton: boolean
  }) => ({
    ...(withIconButton
      ? { borderTopRightRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius, marginLeft: -1 }
      : { borderRadius: theme.borderRadius }),
    fontSize: theme.font.size.body,
    height: inputHeight,
    label: "input",
    flexGrow: 1,
    padding: "8px 12px",
    opacity: disabled ? 0.6 : 1.0,
    font: "inherit",
    border: "1px solid",
    borderColor: isError ? theme.color.error : theme.color.border.default,
    WebkitAppearance: "none",
    "&:focus": inputFocus({
      theme,
      isError,
    }),
  }),
)

const HelpTooltip = styled(Tooltip)({
  minWidth: 100,
  width: "fit-content",
})

const Input: React.SFC<Props> = props => {
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

  const withIconButton = Boolean(props.icon && props.onIconClick)

  const inputButtonElement = withIconButton && (
    <InputButton
      onClick={() => {
        props.onIconClick()
      }}
    >
      {props.icon === String(props.icon) ? <Icon name={props.icon as IconName} size={16} /> : props.icon}
    </InputButton>
  )

  if (props.label) {
    return (
      <Label id={props.id} htmlFor={forAttributeId} className={props.className} left>
        <LabelText>{props.label}</LabelText>
        <FormFieldControls>
          {props.hint ? (
            <FormFieldControl>
              <Icon name="HelpCircle" size={14} />
              <HelpTooltip right>{props.hint}</HelpTooltip>
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
        <InputFieldContainer withLabel>
          {inputButtonElement}
          <InputField
            {...commonInputProps}
            id={forAttributeId}
            autoComplete={props.autoComplete}
            withIconButton={withIconButton}
          />
        </InputFieldContainer>
        {props.error ? <FormFieldError>{props.error}</FormFieldError> : null}
      </Label>
    )
  }

  return (
    <InputFieldContainer>
      {inputButtonElement}
      <InputField
        {...commonInputProps}
        id={props.id}
        className={props.className}
        autoComplete={props.autoComplete}
        withIconButton={withIconButton}
      />
    </InputFieldContainer>
  )
}

export default Input
