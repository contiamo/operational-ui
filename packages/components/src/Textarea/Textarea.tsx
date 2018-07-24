import * as React from "react"
import styled from "react-emotion"
import CopyToClipboard from "react-copy-to-clipboard"
import { OperationalStyleConstants } from "../utils/constants"

import { Label, LabelText, labelTextHeight, FormFieldControls, FormFieldError, inputFocus } from "../utils/mixins"
import Hint from "../Hint/Hint"
import Icon from "../Icon/Icon"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts

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

const TextareaComp = styled("textarea")(
  ({
    theme,
    isCode,
    isError,
    isAction,
    disabled,
    resize,
  }: {
    theme?: OperationalStyleConstants
    isCode: boolean
    isError: boolean
    isAction: boolean
    disabled: boolean
    resize: ResizeOptions
  }) => {
    const topPadding = (isAction ? 20 : 0) + theme.space.small
    return {
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
  },
)

const ActionHeader = styled("div")(
  ({ theme, isError, isLabel }: { theme?: OperationalStyleConstants; isError: boolean; isLabel: boolean }) => ({
    fontSize: theme.font.size.fineprint,
    padding: `${theme.space.base}px ${theme.space.small}px`,
    color: theme.color.text.lighter,
    width: "100%",
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    border: `1px solid ${isError ? theme.color.error : theme.color.border.default}`,
    borderBottom: 0,
    position: "absolute",
    backgroundColor: theme.color.background.lighter,
    top: `${isLabel ? labelTextHeight + theme.space.base : 0}px`,
    left: 0,
    zIndex: theme.zIndex.formFieldError,
    display: "flex",
    justifyContent: "flex-end",

    /**
     * Use case: External Links typically have <Icon/>s next to them.
     */
    "& a": {
      display: "inline-flex",
      alignItems: "center",
      textDecoration: "none",
      color: theme.color.primary,
      cursor: "pointer",
    },
    "& svg": {
      margin: `0 ${theme.space.base}px`,
      width: 10,
      height: 10,
      cursor: "pointer",
    },
  }),
)

class Textarea extends React.Component<Props, State> {
  timeoutId: number = null

  state = {
    showTooltip: false,
  }

  static defaultProps: Partial<Props> = {
    copy: false,
    disabled: false,
    resize: "vertical",
  }

  showTooltip = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.setState(() => ({ showTooltip: true }))

    this.timeoutId = window.setTimeout(() => {
      this.setState(() => ({ showTooltip: false }))
      this.timeoutId = null
    }, 1000)
  }

  render() {
    return (
      <Label fullWidth={this.props.fullWidth} className={this.props.className} id={this.props.id}>
        {this.props.label && <LabelText>{this.props.label}</LabelText>}
        {this.props.hint && (
          <FormFieldControls>
            <Hint>{this.props.hint}</Hint>
          </FormFieldControls>
        )}
        <TextareaComp
          disabled={this.props.disabled}
          isCode={this.props.code}
          value={this.props.value}
          isError={Boolean(this.props.error)}
          isAction={Boolean(this.props.action || this.props.copy)}
          resize={this.props.resize}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!this.props.onChange) {
              return
            }
            this.props.onChange(e.target.value)
          }}
        />
        {(this.props.action || this.props.copy) && (
          <ActionHeader isError={Boolean(this.props.error)} isLabel={Boolean(this.props.label)}>
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
