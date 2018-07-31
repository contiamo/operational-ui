import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import styled from "../utils/styled"

import Hint from "../Hint/Hint"
import Icon from "../Icon/Icon"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts
import { FormFieldControls, FormFieldError, inputFocus, Label, LabelText, labelTextHeight } from "../utils/mixins"

type ResizeOptions = "none" | "both" | "vertical" | "horizontal"

export interface Props {
  id?: string
  className?: string
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

class Textarea extends React.Component<Props, State> {
  public timeoutId: number | null = null

  public state = {
    showTooltip: false,
  }

  public static defaultProps: Partial<Props> = {
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
    return (
      <Label fullWidth={this.props.fullWidth} className={this.props.className} id={this.props.id}>
        {this.props.label && <LabelText>{this.props.label}</LabelText>}
        {this.props.hint && (
          <FormFieldControls>
            <Hint>{this.props.hint}</Hint>
          </FormFieldControls>
        )}
        <TextareaComp
          disabled={this.props.disabled!}
          isCode={this.props.code!}
          value={this.props.value}
          isError={Boolean(this.props.error)}
          isAction={Boolean(this.props.action || this.props.copy)}
          resize={this.props.resize!}
          height={this.props.height}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!this.props.onChange) {
              return
            }
            this.props.onChange(e.target.value)
          }}
        />
        {(this.props.action || this.props.copy) && (
          <ActionHeader isLabel={Boolean(this.props.label)}>
            {this.props.action}
            {this.props.copy && (
              <CopyToClipboard text={this.props.value} onCopy={this.showTooltip}>
                <div>
                  {this.state.showTooltip && <Tooltip right>Copied!</Tooltip>}
                  <Icon size={8} name="Copy" />
                  <a>Copy to clipboard</a>
                </div>
              </CopyToClipboard>
            )}
          </ActionHeader>
        )}
        {this.props.error && <FormFieldError>{this.props.error}</FormFieldError>}
      </Label>
    )
  }
}

export default Textarea
