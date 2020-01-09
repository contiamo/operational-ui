import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import Hint from "../Hint/Hint"
import { LabelText } from "../LabelText/LabelText"
import { useOperationalContext } from "../OperationalContext/OperationalContext"
import { DefaultInputProps, DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import { isCmdEnter, lighten, inputFocus } from "../utils"
import { FormFieldControls, Label } from "../utils/mixins"
import styled from "../utils/styled"
import { CopyIcon } from "../Icon"

type ResizeOptions = "none" | "both" | "vertical" | "horizontal"

export interface TextareaProps extends DefaultProps, DefaultInputProps {
  /** What is the identifier of this textarea? */
  id?: string
  /** Controlled value of the field */
  value: string
  /** Label of the field */
  label?: string
  /** OnChange handler */
  onChange?: (val: string) => void
  /** Change the font to monospace to better display of code */
  code?: boolean
  /** Custom starting height */
  height?: number
  /** Text for a hint */
  hint?: string
  /** Automatically focus the input on page load */
  autoFocus?: boolean
  /** Error text */
  error?: string
  /** Should the input fill its container? */
  fullWidth?: boolean
  /** Is it disabled? */
  disabled?: boolean
  /** Action button/link - right of header */
  action?: React.ReactNode
  /** Resize option */
  resize?: ResizeOptions
  /** Copy text to clipboard on click */
  copy?: boolean
  /** Text for a placeholder */
  placeholder?: string
  /** cmd+enter submit handler */
  onSubmit?: () => void
  /** Focus handler */
  onFocus?: (ev: React.FocusEvent<HTMLTextAreaElement>) => void
  /** Blur handler */
  onBlur?: (ev: React.FocusEvent<HTMLTextAreaElement>) => void
}

export interface State {
  showTooltip: boolean
}

const TextareaComp = styled.textarea<{
  isCode: boolean
  disabled: boolean
  resize: ResizeOptions
  autoFocus?: boolean
  height?: number
}>(({ theme, isCode, resize, autoFocus, height }) => {
  return {
    height,
    resize,
    autofocus: autoFocus,
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.regular,
    display: "block",
    width: "100%",
    minHeight: 120,
    padding: `${theme.space.small}px ${theme.space.medium}px`,
    fontFamily: isCode ? "monospace" : theme.font.family.main,
    border: "none",
    // There's an white subpixel if it's theme.borderRadius and no noticeable regression if -1
    borderRadius: theme.borderRadius - 1,
    ":focus": {
      ...inputFocus({ theme }),
    },
  }
})

const ActionHeader = styled("div")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  color: theme.color.text.lighter,
  backgroundColor: theme.color.background.lighter,
  padding: `${theme.space.base}px ${theme.space.small}px`,
  width: `100%`,
  display: "flex",
  justifyContent: "flex-end",
  borderTopLeftRadius: theme.borderRadius - 1,
  borderTopRightRadius: theme.borderRadius - 1,
  /**
   * Use case: External Links typically have <Icon/>s next to them.
   */
  "& a": {
    display: "inline-flex",
    alignItems: "center",
    color: theme.color.primary,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  "& svg": {
    margin: `0 ${theme.space.base}px`,
    width: 10,
    height: 10,
    cursor: "pointer",
  },
}))

const Outline = styled("div")<{
  error: boolean
  disabled: boolean
  focus: boolean
}>(({ theme, error, focus, disabled }) => ({
  borderRadius: theme.borderRadius,
  border: `${theme.color.border.default} 1px solid`,
  borderColor: error ? theme.color.error : focus ? theme.color.primary : theme.color.border.default,
  opacity: disabled ? 0.6 : 1.0,
}))

const FormFieldError = styled("div")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  color: theme.color.error,
  padding: `${theme.space.base / 2}px ${theme.space.medium}px`,
  marginBottom: 0,
  width: "100%",
  borderBottomLeftRadius: theme.borderRadius - 1,
  borderBottomRightRadius: theme.borderRadius - 1,
  backgroundColor: lighten(theme.color.error, 60),
}))

const Textarea: React.FC<TextareaProps> = ({
  id,
  fullWidth,
  label,
  hint,
  value,
  autoFocus,
  error,
  action,
  height,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  disabled = false,
  code = false,
  copy = false,
  resize = "vertical",
  tabIndex,
  placeholder,
  ...props
}) => {
  const { pushMessage } = useOperationalContext()
  const uniqueId = useUniqueId(id)
  const [focus, setFocus] = React.useState(false)

  const focusHandler = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(true)
    if (onFocus) {
      onFocus(ev)
    }
  }
  const blurHandler = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(false)
    if (onBlur) {
      onBlur(ev)
    }
  }

  return (
    <Label id={`textarea-label-${uniqueId}`} fullWidth={fullWidth}>
      {label && <LabelText>{label}</LabelText>}
      {hint && (
        <FormFieldControls>
          <Hint textId={`textarea-hint-${uniqueId}`}>{hint}</Hint>
        </FormFieldControls>
      )}
      <Outline focus={focus} error={Boolean(error)} disabled={disabled}>
        {(action || copy) && (
          <ActionHeader>
            {action}
            {copy && (
              <CopyToClipboard
                text={value}
                onCopy={() => pushMessage({ type: "success", body: "Successfully Copied" })}
              >
                <div role="button" aria-label="Copy to Clipboard">
                  <CopyIcon size={8} />
                  <a>Copy to clipboard</a>
                </div>
              </CopyToClipboard>
            )}
          </ActionHeader>
        )}
        <TextareaComp
          id={`textarea-field-${uniqueId}`}
          aria-label={label ? label : undefined}
          aria-labelledby={`textarea-label-${uniqueId}`}
          aria-describedby={hint ? `textarea-hint-${uniqueId}` : undefined}
          disabled={disabled}
          isCode={code}
          value={value}
          autoFocus={autoFocus}
          resize={resize}
          height={height}
          tabIndex={tabIndex}
          placeholder={placeholder}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onKeyDown={(ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (isCmdEnter(ev) && onSubmit) {
              onSubmit()
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!onChange) {
              return
            }
            onChange(e.target.value)
          }}
          {...props}
        />
        {error && <FormFieldError>{error}</FormFieldError>}
      </Outline>
    </Label>
  )
}

export default Textarea
