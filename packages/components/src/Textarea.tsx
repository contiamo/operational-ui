import * as React from "react"
import glamorous, { CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"

import { Label, LabelText, FormFieldControls, FormFieldControl, FormFieldError, inputFocus } from "./utils/mixins"
import Icon from "./Icon"
import Tooltip from "./Tooltip"

// This type is a testbed for this component to test reliability.
// TODO: adopt across components once battle-tested.
export type ThemedCSSProperties = (a: { theme: Theme }) => CSSProperties

export interface Props {
  id?: string
  css?: CSSProperties | ThemedCSSProperties
  className?: string
  value: string
  label?: string
  onChange?: (val: string) => void
  code?: boolean
  hint?: string
  error?: string
  disabled?: boolean
}

const numericalHeight = (css: CSSProperties | ThemedCSSProperties, theme: Theme): number | null => {
  const workingCss = typeof css === "function" ? css({ theme }) : css
  if (!workingCss.height || typeof workingCss.height !== "number") {
    return null
  }
  return workingCss.height
}

const TextareaComp = glamorous.textarea(
  ({
    theme,
    isCode,
    isError,
    css_,
    disabled,
  }: {
    theme: Theme
    isCode: boolean
    isError: boolean
    css_: CSSProperties | ThemedCSSProperties
    disabled: boolean
  }): {} => {
    const numericalHeightSetting = numericalHeight(css_, theme)
    return {
      ...theme.typography.body,
      display: "block",
      width: "100%",
      minHeight: 120,
      ...numericalHeightSetting === null ? {} : { height: numericalHeightSetting - 20 },
      borderRadius: 4,
      borderColor: isError ? theme.colors.error : theme.colors.inputBorder,
      padding: `${theme.spacing / 2}px ${theme.spacing * 2 / 3}px`,
      fontFamily: isCode ? "monospace" : "inherit",
      opacity: disabled ? 0.6 : 1.0,
      ":focus": inputFocus({ theme, isError }),
    }
  }
)

const Textarea = (props: Props) => {
  return (
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
      {/* The prop `css_` is used because the prop is used merely for some computation inside the
          * glamorous component as opposed to as actual styles to be injected into the component.
          */}
      <TextareaComp
        css_={props.css || {}}
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
