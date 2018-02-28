import * as React from "react"
import { SketchPicker, RGBColor } from "react-color"
import glamorous, { GlamorousComponent, CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"
import Button from "./Button"

export interface Props {
  id?: string | number
  css?: {}
  className?: string
  color?: string
  size?: number
  onChange?: (color: string) => any
}

export interface State {
  isPickerOpen: boolean
}

const Container = glamorous.div({
  label: "colorpicker",
  display: "inline-block",
  width: "fit-content",
  position: "relative"
})

const ColorSquare = glamorous.div(
  {
    border: `3px solid white`,
    borderRadius: 2,
    cursor: "pointer"
  },
  ({ color, size, theme }: { color: string; size: number; theme?: Theme }) => ({
    width: size,
    height: size,
    boxShadow: `0 0 0 1px ${theme.colors.gray30}`,
    backgroundColor: color
  })
)

const PickerContainer = glamorous.div({ position: "absolute" }, ({ theme }: { theme?: Theme }) => ({
  top: theme.spacing * 3.5,
  left: "50%",
  transform: "translate3d(-50%, 0, 0)",
  zIndex: theme.baseZIndex + 100
}))

export default class ColorPicker extends React.Component<Props, State> {
  static defaultProps = {
    color: "#03f",
    size: 16
  }

  state = {
    isPickerOpen: false
  }

  containerEl: HTMLDivElement | null = null

  // This implements "click outside to close" behavior
  handleClickOutside = (e: MouseEvent) => {
    const el = this.containerEl

    // if we're somehow not working with a DOM node (flowtype is fun!)
    if (!(e.target instanceof Node)) {
      return
    }
    // if we're clicking on the ColorPicker itself,
    if (el && el.contains(e.target)) {
      return
    }

    // if we're clicking outside,
    this.close()
  }

  handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside, true)
    window.addEventListener("keyup", this.handleEsc, true)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside, true)
    window.removeEventListener("keyup", this.handleEsc, true)
  }

  togglePicker() {
    this.setState(prevState => ({ isPickerOpen: !prevState.isPickerOpen }))
  }

  close() {
    this.setState(() => ({ isPickerOpen: false }))
  }

  onColorChange(color: { hex: string; rgb: RGBColor }) {
    if (this.props.onChange) {
      this.props.onChange(color.hex)
    }
  }

  render() {
    const { size, color } = this.props
    return (
      <Container
        key={this.props.id}
        css={this.props.css}
        className={this.props.className}
        innerRef={(containerEl: any): void => {
          this.containerEl = containerEl
        }}
        onClick={() => this.togglePicker()}
      >
        <Button color={color}>{color}</Button>
        {this.state.isPickerOpen && (
          <PickerContainer onClick={(e: React.SyntheticEvent<HTMLDivElement>) => e.stopPropagation()}>
            <SketchPicker color={this.props.color} onChangeComplete={color => this.onColorChange(color)} />
          </PickerContainer>
        )}
      </Container>
    )
  }
}
