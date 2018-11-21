import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { DefaultProps } from "../types"
import { isCmdEnter, lighten } from "../utils"
import styled from "../utils/styled"

import Hint from "../Hint/Hint"
import Icon from "../Icon/Icon"
import { LabelText } from "../LabelText/LabelText"
import Tooltip from "../Tooltip/Tooltip"
import { FormFieldControls, FormFieldError, inputFocus, Label } from "../utils/mixins"

type ResizeOptions = "none" | "both" | "vertical" | "horizontal"

export interface TextareaProps extends DefaultProps {
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
  /** cmd+enter submit handler */
  onSubmit?: () => void
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
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.regular,
    position: "relative",
    display: "block",
    width: "100%",
    minHeight: 120,
    borderRadius: isAction ? `0 0 ${theme.borderRadius}px ${theme.borderRadius}px` : theme.borderRadius,
    borderColor: isError ? theme.color.error : theme.color.border.default,
    padding: `${theme.space.small}px ${theme.space.medium}px ${theme.space.small}px ${theme.space.medium}px`,
    fontFamily: isCode ? "monospace" : "inherit",
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

class Textarea extends React.Component<TextareaProps, State> {
  public timeoutId: number | null = null

  public state = {
    showTooltip: false,
  }

  public static defaultProps: Partial<TextareaProps> = {
    copy: false,
    code: false,
    disabled: false,
    resize: "vertical",
  }

  public showTooltip = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.setState(() => ({ showTooltip: true }))

    this.timeoutId = window.setTimeout(() => {
      this.setState(() => ({ showTooltip: false }))
      this.timeoutId = null
    }, 1000)
  }

  public render() {
    const {
      fullWidth,
      resize,
      label,
      hint,
      disabled,
      code,
      value,
      error,
      action,
      height,
      copy,
      onChange,
      onSubmit,
      ...props
    } = this.props
    return (
      <Label {...props} fullWidth={fullWidth}>
        {label && <LabelText>{label}</LabelText>}
        {hint && (
          <FormFieldControls>
            <Hint>{hint}</Hint>
          </FormFieldControls>
        )}
        <TextareaComp
          disabled={disabled!}
          isCode={code!}
          value={value}
          isError={Boolean(error)}
          isAction={Boolean(action || copy)}
          resize={resize!}
          height={height}
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
        {(this.props.action || this.props.copy) && (
          <ActionHeader isLabel={Boolean(label)}>
            {action}
            {copy && (
              <CopyToClipboard text={value} onCopy={this.showTooltip}>
                <div>
                  {this.state.showTooltip && <Tooltip right>Copied!</Tooltip>}
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
}

export default Textarea
