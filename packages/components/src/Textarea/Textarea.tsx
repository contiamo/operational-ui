import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

import { Label, LabelText, FormFieldControls, FormFieldError, inputFocus } from "../utils/mixins"
import Hint from "../Hint/Hint"

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
}

const TextareaComp = styled("textarea")(
  ({
    theme,
    isCode,
    isError,
    disabled,
  }: {
    theme?: OperationalStyleConstants
    isCode: boolean
    isError: boolean
    disabled: boolean
  }) => {
    return {
      ...theme.deprecated.typography.body,
      display: "block",
      width: "100%",
      minHeight: 120,
      borderRadius: 4,
      borderColor: isError ? theme.deprecated.colors.error : theme.deprecated.colors.inputBorder,
      padding: `${theme.deprecated.spacing / 2}px ${(theme.deprecated.spacing * 2) / 3}px`,
      fontFamily: isCode ? "monospace" : "inherit",
      opacity: disabled ? 0.6 : 1.0,
      ":focus": inputFocus({
        theme,
        isError,
      }),
    }
  },
)

const Textarea = (props: Props) => {
  return (
    <Label fullWidth={props.fullWidth} className={props.className} id={props.id}>
      {props.label ? <LabelText>{props.label}</LabelText> : null}
      <FormFieldControls>{props.hint && <Hint>{props.hint}</Hint>}</FormFieldControls>
      <TextareaComp
        disabled={Boolean(props.disabled)}
        isCode={Boolean(props.code)}
        value={props.value}
        isError={Boolean(props.error)}
        onChange={(e: any) => {
          if (props.onChange) {
            props.onChange(e.target.value)
          }
        }}
      />
      {props.error ? <FormFieldError>{props.error}</FormFieldError> : null}
    </Label>
  )
}

export default Textarea
