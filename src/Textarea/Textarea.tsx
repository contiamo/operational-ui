import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { DefaultProps } from "../types"
import { isCmdEnter } from "../utils"
import styled from "../utils/styled"

import Hint from "../Hint/Hint"
import Icon from "../Icon/Icon"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts
import { FormFieldControls, FormFieldError, inputFocus, Label, LabelText, labelTextHeight } from "../utils/mixins"

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
  const topPadding = (isAction ? 20 : 0) + theme.space.small
  return {
    height,
    resize,
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.regular,
    display: "block",
    width: "100%",
    minHeight: 120,
    borderRadius: theme.borderRadius,
    borderColor: isError ? theme.color.error : theme.color.border.default,
    padding: `${topPadding}px ${theme.space.medium}px ${theme.space.small}px ${theme.space.medium}px`,
    fontFamily: isCode ? "monospace" : "inherit",
    opacity: disabled ? 0.6 : 1.0,
    ":focus": inputFocus({
      theme,
      isError,
    }),
  }
})

const borderWidth = 1

const ActionHeader = styled("div")<{ isLabel: boolean }>(({ theme, isLabel }) => ({
  fontSize: theme.font.size.fineprint,
  padding: `${theme.space.base}px ${theme.space.small}px`,
  color: theme.color.text.lighter,
  width: `calc(100% - ${2 * borderWidth}px)`,
  position: "absolute",
  backgroundColor: theme.color.background.lighter,
  top: `${borderWidth + (isLabel ? labelTextHeight + theme.space.base : 0)}px`,
  left: borderWidth,
  zIndex: theme.zIndex.formFieldError,
  display: "flex",
  justifyContent: "flex-end",
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
