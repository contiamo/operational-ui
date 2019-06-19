import * as React from "react"

import { FormFieldError, inputFocus, setAlpha } from "../utils"
import styled from "../utils/styled"
import { InputProps } from "./Input"
import InputButton from "./Input.Button"
import { height } from "./Input.constants"
import { NoIcon, ServiceAccountIcon } from "../Icon/Icon"

const width = 360

const Container = styled("div")<{
  fullWidth: InputProps["fullWidth"]
  withLabel: boolean
}>`
  position: relative;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? "none" : `${width}px`)};
`

const Field = styled("input")<{
  isError: boolean
  withIconButton: boolean
  preset: InputProps["preset"]
  disabled: InputProps["disabled"]
  clear: InputProps["clear"]

  idStyle: InputProps["idStyle"]
}>(({ theme, disabled, isError, withIconButton, preset, clear, idStyle }) => {
  const makeBackgroundColor = () => {
    if (disabled) {
      return theme.color.disabled
    }

    if (preset) {
      return setAlpha(0.1)(theme.color.primary)
    }

    return theme.color.white
  }

  const getFontWeight = () => {
    if (idStyle) {
      return theme.font.weight.bold
    }

    if (preset) {
      return theme.font.weight.medium
    }

    return theme.font.weight.regular
  }

  const getRightPadding = () => {
    if (clear && idStyle) {
      return height + theme.space.big
    }

    if (clear || idStyle) {
      return height
    }

    return theme.space.small
  }

  return {
    ...(withIconButton
      ? { borderTopRightRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius, marginLeft: -1 }
      : { borderRadius: theme.borderRadius }),
    font: idStyle ? undefined : "inherit",
    fontFamily: idStyle ? theme.font.family.code : theme.font.family.main,
    fontWeight: getFontWeight(),
    fontSize: theme.font.size.body,
    width: "100%",
    height,
    label: "input",
    flexGrow: 1,
    padding: `${theme.space.small}px ${getRightPadding()}px ${theme.space.small}px ${theme.space.medium}px`,
    opacity: disabled ? 0.6 : 1.0,
    border: "1px solid",
    borderColor: isError ? theme.color.error : theme.color.border.default,
    appearance: "none",
    color: preset ? theme.color.text.dark : theme.color.text.default,
    backgroundColor: makeBackgroundColor(),
    "::placeholder": {
      color: theme.color.text.disabled,
    },
    "&:focus": inputFocus({
      theme,
      isError,
    }),
  }
})

const ClearButton = styled.div`
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

const IconContainer = styled.div<{ iconAmount: number; right: number }>`
  position: absolute;
  top: 0; /* anchor the position to the top so the browser doesn't guess */
  right: ${({ right }) =>
    right}px; /* not 12px but 0 because we want a _box_ to attach to the end of Input and not just an X pushed in from the right */

  /* We also probably should specify the dimensions of this box */
  width: ${({ iconAmount }) => iconAmount * height}px;
  height: ${height}px;

  /* Also, let's center the contents of this box */
  display: flex;
  align-items: center;
  justify-content: center;
`

const InputField: React.FC<InputProps> = ({
  id,
  hint,
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
  clear,
  icon,
  copy,
  onIconClick,
  tabIndex,
  idStyle,
  errorComponent: ErrorComponent,
  statusIcon,
  ...props
}) => {
  const shouldShowIconButton = Boolean(icon) || Boolean(copy)

  const renderButton = () => {
    if (copy === true) {
      return <InputButton tabIndex={tabIndex} value={value || ""} copy={copy} />
    } else {
      return <InputButton tabIndex={tabIndex} onIconClick={onIconClick} icon={icon} copy={false} />
    }
  }

  return (
    <>
      <Container fullWidth={fullWidth} withLabel={Boolean(label)}>
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
              ev.stopPropagation()
              onChange(ev.currentTarget.value)
            }
          }}
          clear={clear}
          preset={Boolean(preset)}
          id={`input-field-${id}`}
          withIconButton={shouldShowIconButton}
          autoComplete={autoComplete}
          tabIndex={tabIndex}
          idStyle={idStyle}
          {...props}
        />
        <IconContainer iconAmount={(clear && value ? 1 : 0) + (idStyle ? 1 : 0)} right={0}>
          {clear && value && (
            <ClearButton onClick={clear}>
              <NoIcon />
            </ClearButton>
          )}
          {idStyle && <ServiceAccountIcon />}
        </IconContainer>
        {Boolean(statusIcon) && (
          <IconContainer iconAmount={1} right={-height}>
            {statusIcon}
          </IconContainer>
        )}
        {error && !ErrorComponent ? <FormFieldError>{error}</FormFieldError> : null}
      </Container>
      {error && ErrorComponent ? <ErrorComponent errorMessage={error} /> : null}
    </>
  )
}

export default InputField
