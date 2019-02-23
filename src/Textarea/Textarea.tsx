import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import Hint from "../Hint/Hint"
import Icon from "../Icon/Icon"
import { LabelText } from "../LabelText/LabelText"
import { useOperationalContext } from "../OperationalContext/OperationalContext"
import { DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import { isCmdEnter, lighten } from "../utils"
import { FormFieldControls, FormFieldError, inputFocus, Label } from "../utils/mixins"
import styled from "../utils/styled"

type ResizeOptions = "none" | "both" | "vertical" | "horizontal"

export interface TextareaProps extends DefaultProps {
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

const TextareaComp = styled("textarea")<{
  isCode: boolean
  isError: boolean
  isAction: boolean
  disabled: boolean
  resize: ResizeOptions
  height?: number
}>(({ theme, isCode, isError, isAction, disabled, resize, height }) => {
  return {
    height,
    resize,
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.regular,
    position: "relative",
    display: "block",
    width: "100%",
    minHeight: 120,
    borderRadius: isAction ? `0 0 ${theme.borderRadius}px ${theme.borderRadius}px` : theme.borderRadius,
    borderColor: isError ? theme.color.error : theme.color.border.default,
    padding: `${theme.space.small}px ${theme.space.medium}px ${theme.space.small}px ${theme.space.medium}px`,
    fontFamily: isCode ? "monospace" : theme.font.family.main,
    opacity: disabled ? 0.6 : 1.0,
    ...(isAction ? { borderTop: 0 } : {}),
    ":focus ~ div": {
      borderColor: isError ? theme.color.error : theme.color.primary,
    },
    ":focus ~ div:after": {
      content: "''",
      position: "absolute",
      left: -4,
      right: -4,
      ...(isError
        ? {
            top: 2,
            bottom: -4,
            borderRadius: `0 0 5px 5px`,
            border: `3px ${lighten(theme.color.error, 60)} solid`,
            borderTop: 0,
          }
        : {
            top: -4,
            bottom: 2,
            borderRadius: `5px 5px 0 0`,
            border: `3px ${lighten(theme.color.primary, 40)} solid`,
            borderBottom: 0,
          }),
    },
    ":focus": inputFocus({
      theme,
      isError,
    }),
  }
})

const ActionHeader = styled("div")<{ isLabel: boolean }>(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  padding: `${theme.space.base}px ${theme.space.small}px`,
  color: theme.color.text.lighter,
  width: `100%`,
  position: "absolute",
  top: 2,
  backgroundColor: theme.color.background.lighter,
  borderRadius: `${theme.borderRadius}px ${theme.borderRadius}px 0 0`,
  zIndex: theme.zIndex.formFieldError,
  display: "flex",
  justifyContent: "flex-end",
  border: `${theme.color.border.default} 1px solid`,
  borderBottom: 0,
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

const Textarea: React.FC<TextareaProps> = ({
  id,
  fullWidth,
  label,
  hint,
  value,
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
  ...props
}) => {
  const { pushMessage } = useOperationalContext()
  const uniqueId = useUniqueId(id)

  return (
    <Label id={`textarea-label-${uniqueId}`} {...props} fullWidth={fullWidth}>
      {label && <LabelText>{label}</LabelText>}
      {hint && (
        <FormFieldControls>
          <Hint textId={`textarea-hint-${uniqueId}`}>{hint}</Hint>
        </FormFieldControls>
      )}
      <TextareaComp
        id={`textarea-field-${uniqueId}`}
        aria-label={label ? label : undefined}
        aria-labelledby={`textarea-label-${uniqueId}`}
        aria-describedby={hint ? `textarea-hint-${uniqueId}` : undefined}
        disabled={disabled}
        isCode={code}
        value={value}
        isError={Boolean(error)}
        isAction={Boolean(action || copy)}
        resize={resize}
        height={height}
        onFocus={onFocus}
        onBlur={onBlur}
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
      />
      {(action || copy) && (
        <ActionHeader isLabel={Boolean(label)}>
          {action}
          {copy && (
            <CopyToClipboard text={value} onCopy={() => pushMessage({ type: "success", body: "Successfully Copied" })}>
              <div role="button" aria-label="Copy to Clipboard">
                <Icon size={8} name="Copy" />
                <a>Copy to clipboard</a>
              </div>
            </CopyToClipboard>
          )}
        </ActionHeader>
      )}
      {error && <FormFieldError>{error}</FormFieldError>}
    </Label>
  )
}

export default Textarea
