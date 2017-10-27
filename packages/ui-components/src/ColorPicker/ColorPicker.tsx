import * as React from "react"
import { SketchPicker, RGBColor } from "react-color"
import glamorous, { GlamorousComponent, CSSProperties } from "glamorous"
import { Theme } from "../theme"

export interface IProps {
  css?: any
  className?: string
  color?: string
  size?: number
  onChange?: (color: string) => any
}

export interface IPosition {
  top?: number
  left?: number
}

export interface IState {
  isPickerOpen: boolean
  position: IPosition
}

const hasTheme = (theme: any): boolean => theme && Object.keys(theme).length > 0

const Container = glamorous.div({})

const ColorSquare = glamorous.div(
  {
    border: `3px solid white`,
    borderRadius: 2,
    cursor: "pointer"
  },
  ({ color, size, theme }: { color: string; size: number; theme?: Theme }) =>
    // Need to check this because the tests run without a ThemeProvider
    // Otherwise, tests could not access the state of ColorPicker.
    hasTheme(theme)
      ? {
          width: size,
          height: size,
          boxShadow: `0 0 0 1px ${theme.colors.palette.grey30}`,
          backgroundColor: color
        }
      : {}
)

const PickerContainer = glamorous.div(
  {
    position: "fixed"
  },
  ({ top, left, theme }: { top: number; left: number; theme?: Theme }) =>
    // Need to check this because the tests run without a ThemeProvider
    // Otherwise, tests could not access the state of ColorPicker.
    hasTheme(theme)
      ? {
          top: top + 8,
          left: left + 8,
          zIndex: theme.baseZIndex + 100
        }
      : {}
)

class ColorPicker extends React.Component<IProps, IState> {
  static defaultProps = {
    color: "#03f",
    size: 16
  }

  state = {
    isPickerOpen: false,
    position: {
      top: 0,
      left: 0
    }
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
    this.setState(() => ({ position: this.containerEl.getBoundingClientRect() }))
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
    const { size, color, css, className } = this.props
    return (
      <Container
        css={css}
        className={className}
        innerRef={(containerEl: any): void => {
          this.containerEl = containerEl
        }}
        onClick={() => this.togglePicker()}
      >
        <ColorSquare size={size} color={color} />
        {this.state.isPickerOpen && (
          <PickerContainer
            top={this.state.position.top}
            left={this.state.position.left}
            onClick={(e: React.SyntheticEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <SketchPicker color={this.props.color} onChangeComplete={color => this.onColorChange(color)} />
          </PickerContainer>
        )}
      </Container>
    )
  }
}

export default ColorPicker
