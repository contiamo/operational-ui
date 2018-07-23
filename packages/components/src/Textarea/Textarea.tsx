import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

import { Label, LabelText, labelTextHeight, FormFieldControls, FormFieldError, inputFocus } from "../utils/mixins"
import Hint from "../Hint/Hint"

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
    },
    "& svg": {
      margin: `0 ${theme.space.base}px`,
      width: 12,
      height: 12,
    },
  }),
)

const Textarea: React.SFC<Props> = (props: Props) => {
  return (
    <Label fullWidth={props.fullWidth} className={props.className} id={props.id}>
      {props.label && <LabelText>{props.label}</LabelText>}
      {props.hint && (
        <FormFieldControls>
          <Hint>{props.hint}</Hint>
        </FormFieldControls>
      )}
      <TextareaComp
        disabled={props.disabled}
        isCode={Boolean(props.code)}
        value={props.value}
        isError={Boolean(props.error)}
        isAction={Boolean(props.action)}
        resize={props.resize}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (!props.onChange) {
            return
          }
          props.onChange(e.target.value)
        }}
      />
      {props.action && (
        <ActionHeader isError={Boolean(props.error)} isLabel={Boolean(props.label)}>
          {props.action}
        </ActionHeader>
      )}
      {props.error && <FormFieldError>{props.error}</FormFieldError>}
    </Label>
  )
}

Textarea.defaultProps = {
  disabled: false,
  resize: "vertical",
}

export default Textarea
