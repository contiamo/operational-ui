import * as React from "react"

import Icon from "../Icon/Icon"
import { FormFieldError, inputFocus, setAlpha } from "../utils"
import styled from "../utils/styled"
import { InputProps } from "./Input"
import InputButton from "./Input.Button"
import { height } from "./Input.constants"

const width = 360

const Container = styled("div")<{
  fullWidth: InputProps["fullWidth"]
  withLabel?: boolean
}>`
  position: relative;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  ${({ fullWidth, withLabel }) => `
      display: ${withLabel ? "flex" : "inline-flex"};
      width: 100%;
      max-width: ${fullWidth ? "none" : `${width}px`};
    `};
`

const Field = styled("input")<{
  isError: boolean
  withIconButton: boolean
  preset: InputProps["preset"]
  disabled: InputProps["disabled"]
  clear: InputProps["clear"]
}>(({ theme, disabled, isError, withIconButton, preset, clear }) => {
  const makeBackgroundColor = () => {
    if (disabled) {
      return theme.color.disabled
    }

    if (preset) {
      return setAlpha(0.1)(theme.color.primary)
    }

    return theme.color.white
  }

  return {
    ...(withIconButton
      ? { borderTopRightRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius, marginLeft: -1 }
      : { borderRadius: theme.borderRadius }),
    fontSize: theme.font.size.body,
    width: "100%",
    height,
    label: "input",
    flexGrow: 1,
    padding: `${theme.space.small}px ${theme.space.medium}px`,
    opacity: disabled ? 0.6 : 1.0,
    font: "inherit",
    border: "1px solid",
    borderColor: isError ? theme.color.error : theme.color.border.default,
    appearance: "none",
    fontWeight: preset ? theme.font.weight.medium : theme.font.weight.regular,
    color: preset ? theme.color.text.dark : theme.color.text.default,
    backgroundColor: makeBackgroundColor(),
    "::placeholder": {
      color: theme.color.text.disabled,
    },
    ...(clear ? { paddingRight: 40 } : {}),
    "&:focus": inputFocus({
      theme,
      isError,
    }),
  }
})

const ClearButton = styled("div")`
  position: absolute;
  top: 0; /* anchor the position to the top so the browser doesn't guess */
  right: 0; /* not 12px but 0 because we want a _box_ to attach to the end of Input and not just an X pushed in from the right */

  /* We also probably should specify the dimensions of this box */
  width: ${height}px;
  height: ${height}px;

  /* Also, let's center the contents of this box */
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer; /* Let the user know this is clickable */

  /* We want the user to click on thix _box_, not the icon inside it */
  > svg {
    pointer-events: none;
  }
`

const InputField: React.SFC<InputProps> = ({
  fullWidth,
  inputRef,
  autoFocus,
  name,
  autoComplete,
  disabled,
  value,
  type,
  onFocus,
  onBlur,
  placeholder,
  error,
  onChange,
  preset,
  label,
  labelId,
  clear,
  icon,
  copy,
  onIconClick,
}) => {
  const shouldShowIconButton = Boolean(icon) || Boolean(copy)
  const forAttributeId = label && labelId

  const renderButton = () => {
    if (copy === true) {
      return <InputButton value={value || ""} copy={copy} />
    } else {
      return <InputButton onIconClick={onIconClick} icon={icon} copy={false} />
    }
  }

  return (
    <>
      <Container fullWidth={fullWidth} withLabel>
        {shouldShowIconButton && renderButton()}
        <Field
          ref={inputRef}
          autoFocus={autoFocus}
          name={name}
          disabled={Boolean(disabled)}
          value={value || ""}
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          isError={Boolean(error)}
          onChange={(ev: React.FormEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(ev.currentTarget.value)
            }
          }}
          clear={clear}
          preset={Boolean(preset)}
          id={forAttributeId}
          withIconButton={shouldShowIconButton}
          autoComplete={autoComplete}
        />
        {clear && value && (
          <ClearButton onClick={clear}>
            <Icon color="color.text.lightest" name="No" />
          </ClearButton>
        )}
      </Container>
      {error ? <FormFieldError>{error}</FormFieldError> : null}
    </>
  )
}

export default InputField
