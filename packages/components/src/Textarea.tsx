import * as React from "react"
import glamorous, { CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"

import { Label, LabelText, FormFieldControls, FormFieldControl, FormFieldError, inputFocus } from "./utils/mixins"
import Icon from "./Icon"
import Tooltip from "./Tooltip"

export interface Props {
  id?: string
  css?: CSSProperties
  className?: string
  value: string
  label?: string
  onChange?: (val: string) => void
  code?: boolean
  hint?: string
  error?: string
}

const TextareaComp = glamorous.textarea(
  ({ theme, isCode, isError }: { theme: Theme; isCode: boolean; isError: boolean }): {} => ({
    ...theme.typography.body,
    display: "block",
    width: "100%",
    minHeight: 120,
    borderRadius: 4,
    borderColor: isError ? theme.colors.error : theme.colors.inputBorder,
    padding: `${theme.spacing / 2}px ${theme.spacing * 2 / 3}px`,
    fontFamily: isCode ? "monospace" : "inherit",
    ":focus": inputFocus({ theme, isError })
  })
)

const Textarea = (props: Props) => (
  <Label css={props.css} className={props.className} id={props.id}>
    {props.label ? <LabelText>{props.label}</LabelText> : null}
    <FormFieldControls>
      {props.hint ? (
        <FormFieldControl>
          <Icon name="HelpCircle" size={14} />
          <Tooltip right css={{ minWidth: 100, width: "fit-content" }}>
            {props.hint}
          </Tooltip>
        </FormFieldControl>
      ) : null}
    </FormFieldControls>
    <TextareaComp
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

export default Textarea
