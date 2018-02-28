import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import withLabel from "./utils/with-label"

export interface Props {
  id?: string
  css?: {}
  className?: {}
  options: string[]
  selected: string[]
  onChange?: (newOptions: string[]) => void
}

const Container = glamorous.div({
  label: "checkbox"
})

const OptionLabel = glamorous.label(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  marginRight: theme.spacing
}))

const OptionText = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.body,
  display: "inline-block",
  marginLeft: theme.spacing / 6
}))

const Checkbox = (props: Props) => (
  // `css` and `className` props are not set, as they are set on the wrapped label container.
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
                  : [...props.selected, option]
              )
          }}
        />
        <OptionText>{option}</OptionText>
      </OptionLabel>
    ))}
  </Container>
)

export default withLabel(Checkbox)
