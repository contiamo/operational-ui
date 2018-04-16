import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import { Label, LabelText, inputFocus } from "./utils/mixins"

export interface Props {
  value: string
  label?: string
  onChange?: (val: string) => void
  css?: {}
}

const TextareaComp = glamorous.textarea(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.body,
  display: "block",
  width: "100%",
  minHeight: 120,
  borderRadius: 4,
  borderColor: "rgb(208, 217, 229)",
  padding: theme.spacing * 2 / 3,
  fontFamily: "monospace",
  ":focus": inputFocus({ theme })
}))

const Textarea = (props: Props) => (
  <Label css={props.css}>
    {props.label ? <LabelText>{props.label}</LabelText> : null}
    <TextareaComp
      value={props.value}
      onChange={(e: any) => {
        if (props.onChange) {
          props.onChange(e.target.value)
        }
      }}
    />
  </Label>
)

export default Textarea
