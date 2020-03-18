import * as React from "react"

import { FormFieldError, inputFocus } from "../utils"
import styled from "../utils/styled"
import { InputProps } from "./Input"
import InputButton from "./Input.Button"
import { height, iconBoxSize, width } from "./Input.constants"
import { NoIcon, IDIcon } from "../Icon"
import { getAccentColor } from "../utils/constants"

const getMaxWidth = (fullWidth: InputProps["fullWidth"], statusIcon: InputProps["statusIcon"]) => {
  if (fullWidth && statusIcon) {
    return `calc(100% - ${iconBoxSize}px)`
  }

  if (fullWidth) {
    return "none"
  }

  return `${width}px`
}

const Container = styled.div<{
  fullWidth: InputProps["fullWidth"]
  statusIcon: InputProps["statusIcon"]
}>`
  label: InputField;
  position: relative;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  width: 100%;
  max-width: ${({ fullWidth, statusIcon }) => getMaxWidth(fullWidth, statusIcon)};
`

const Field = styled.input<{
  isError: boolean
  withIconButton: boolean
  preset: InputProps["preset"]
  disabled: InputProps["disabled"]
  clear: InputProps["clear"]
  isUniqueId: InputProps["isUniqueId"]
}>(({ theme, disabled, isError, withIconButton, preset, clear, isUniqueId }) => {
  const makeBackgroundColor = () => {
    if (disabled) {
      return theme.color.disabled
    }

    if (preset) {
      return getAccentColor(theme)
    }

    return theme.color.white
  }

  const getFontWeight = () => {
    if (isUniqueId) {
      return theme.font.weight.bold
    }

    if (preset) {
      return theme.font.weight.medium
    }

    return theme.font.weight.regular
  }

  const getRightPadding = () => {
    if (clear && isUniqueId) {
      return iconBoxSize + theme.space.big
    }

    if (clear || isUniqueId) {
      return iconBoxSize
    }

    return theme.space.small
  }

  return {
    ...(withIconButton
      ? { borderTopRightRadius: theme.borderRadius, borderBottomRightRadius: theme.borderRadius, marginLeft: -1 }
      : { borderRadius: theme.borderRadius }),
    font: isUniqueId ? "none" : "inherit",
    fontFamily: isUniqueId ? theme.font.family.code : "inherit",
    fontWeight: getFontWeight(),
    fontSize: theme.font.size.small,
    width: "100%",
    height,
    label: "input",
    flexGrow: 1,
    padding: `${theme.space.small}px ${getRightPadding()}px ${theme.space.small}px ${theme.space.medium}px`,
    opacity: disabled ? 0.6 : 1.0,
    border: "none",
    boxShadow: `0 0 0 1px ${isError ? theme.color.error : theme.color.border.default}`,
    margin: "1px 1px", // offset box-shadow like a border
    outline: "none",
    appearance: "none",
    color: preset ? theme.color.text.dark : theme.color.text.default,
    backgroundColor: makeBackgroundColor(),
    "::placeholder": {
      color: theme.color.text.disabled,
    },
    ":focus": inputFocus({ theme, isError }),
  }
})

const ClearButton = styled.div`
  /* We also probably should specify the dimensions of this box */
  width: ${iconBoxSize}px;
  height: ${iconBoxSize}px;

  /* Also, let's center the contents of this box */
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer; /* Let the user know this is clickable */

  outline: none;
  :focus {
    ${({ theme }) =>
      inputFocus({
        theme,
      })}
  }

  /* We want the user to click on thix _box_, not the icon inside it */
  > svg {
    pointer-events: none;
  }
`

const IconContainer = styled.div<{ iconAmount: number; right: number }>`
  position: absolute;
  top: 0; /* anchor the position to the top so the browser doesn't guess */
  right: ${({ right }) => right}px;

  /* Dimensions of the container */
  width: ${({ iconAmount }) => iconAmount * iconBoxSize}px;
  height: ${iconBoxSize}px;

  /* Also, let's center the contents of this box */
  display: flex;
  align-items: center;
  justify-content: center;
`

const UniqueIdIcon = styled(IDIcon)`
  color: ${({ theme }) => theme.color.text.lightest};
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
  errorComponent: ErrorComponent,
  isUniqueId,
  statusIcon,
  placeholderIcon,
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
      <Container fullWidth={fullWidth} statusIcon={statusIcon}>
        {shouldShowIconButton && renderButton()}
        <Field
          data-cy="operational-ui__Input"
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
          isUniqueId={isUniqueId}
          {...props}
        />
        <IconContainer iconAmount={placeholderIcon && !value ? 1 : 0} right={0}>
          {/* Clear button and Id style icon within the input border */}
          {!value && placeholderIcon}
        </IconContainer>
        <IconContainer iconAmount={(clear && value ? 1 : 0) + (isUniqueId ? 1 : 0)} right={0}>
          {/* Clear button and Id style icon within the input border */}
          {clear && value && (
            <ClearButton
              data-cy="operational-ui__Input-clear-button"
              aria-label="Clear Input"
              tabIndex={0}
              onClick={clear}
            >
              <NoIcon size={10} />
            </ClearButton>
          )}
          {isUniqueId && <UniqueIdIcon />}
        </IconContainer>
        {Boolean(statusIcon) && (
          <IconContainer data-cy="operational-ui__Input-status-icon" iconAmount={1} right={-iconBoxSize}>
            {/* negative `right` to place the status icon on the right side of the input */}
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
