import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"

import { Label, LabelText, FormFieldControls, FormFieldControl, FormFieldError, inputFocus } from "../utils/mixins"
import { Icon } from "../"
import Tooltip from "../Tooltip/Tooltip" // Styled components appears to have an internal bug that breaks when this is imported from index.ts
import { Css, CssStatic } from "../types"

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
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    isCode: boolean
    isError: boolean
    disabled: boolean
  }): CssStatic => {
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

const HelpTooltip = styled(Tooltip)({
  minWidth: 100,
  width: "fit-content",
})

const Textarea = (props: Props) => {
  return (
    <Label className={props.className} id={props.id}>
      {props.label ? <LabelText>{props.label}</LabelText> : null}
      <FormFieldControls>
        {props.hint ? (
          <FormFieldControl>
            <Icon name="HelpCircle" size={14} />
            <HelpTooltip right>{props.hint}</HelpTooltip>
          </FormFieldControl>
        ) : null}
      </FormFieldControls>
      {/* The prop `css_` is used because the prop is used merely for some computation inside the
        * glamorous component as opposed to as actual styles to be injected into the component.
        */}
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
