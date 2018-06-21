import * as React from "react"
import styled from "react-emotion"
import withLabel from "../utils/with-label"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  /** Checkbox options */

  options: string[]
  /** Selected options */

  selected: string[]
  /** Callback fired when the selection options change. */

  onChange?: (newOptions: string[]) => void
}

const Container = styled("div")({
  label: "checkbox",
})

const OptionLabel = styled("label")(
  ({ theme }: WithTheme): CssStatic => ({
    display: "inline-block",
    marginRight: theme.deprecated.spacing,
  }),
)

const OptionText = styled("span")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.body,
    display: "inline-block",
    marginLeft: theme.deprecated.spacing / 6,
  }),
)

const Checkbox: React.SFC<Props> = (
  props, // `css` and `className` props are not set, as they are set on the wrapped label container.
) => (
  // See ./utils/with-label.tsx.
  <Container>
    {props.options.map((option, index) => (
      <OptionLabel key={index}>
        <input
          type="checkbox"
          checked={props.selected.indexOf(option) > -1}
          onChange={() => {
            props.onChange &&
              props.onChange(
                props.selected.indexOf(option) > -1
                  ? props.selected.filter((option_: string) => option !== option_)
                  : [...props.selected, option],
              )
          }}
        />
        <OptionText>{option}</OptionText>
      </OptionLabel>
    ))}
  </Container>
)

export default withLabel(Checkbox)
