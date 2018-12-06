import * as React from "react"
import Toggler, { TogglerProps } from "./Foldable.Toggler"

export interface FoldableProps {
  children: (
    { Toggler, isFolded }: { Toggler: React.ComponentType<TogglerProps>; isFolded: boolean },
  ) => React.ReactNode
}

interface FoldableState {
  isFolded: boolean
  /**
   * Why is isTogglerHovered on state? We need to set
   * it on the state in order to show the toggler as
   * "clickable" (grey background) on hover for two
   * SEPARATE, DISTINCT DOM nodes for horizontally
   * stacked `CardSection`s.
   *
   * CSS can't solve this because this component doesn't
   * add a DOM node, so we can't style descendants.
   *
   * Even if we could, CardSection's headers are well-
   * encapsulated so they're not even accessable with CSS.
   */
  isTogglerHovered: boolean
}

class Foldable extends React.Component<FoldableProps, Readonly<FoldableState>> {
  private togglerRef = React.createRef<HTMLDivElement>()

  public readonly state: FoldableState = {
    isFolded: false,
    isTogglerHovered: false,
  }

  /**
   * Why do we listen on mouse move? Because mouse events in succession
   * (like a rapid enter/leave on Toggler) get lost. This is a known
   * shortfall with browsers' event systems.
   *
   * So, as a workaround, we watch the mouse as it spans the `document`
   * and if it's _not_ on a Toggler, set `isTogglerHovered` false on the
   * state.
   */
  public componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove)
  }

  public componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove)
  }

  private handleMouseMove = (e: Event) => {
    // If we don't have a ref to the Toggler, there's nothing to do.
    if (this.togglerRef.current === null) {
      return
    }
    if (this.state.isTogglerHovered && !e.composedPath().includes(this.togglerRef.current)) {
      this.unsetHovered()
    }
  }

  private toggle = () => {
    this.setState(() => ({ isFolded: !this.state.isFolded }))
  }

  private setHovered() {
    this.setState(() => ({ isTogglerHovered: true }))
  }

  private unsetHovered() {
    this.setState(() => ({ isTogglerHovered: false }))
  }

  public render() {
    const { children } = this.props
    const { isFolded, isTogglerHovered } = this.state

    return children({
      Toggler: () => (
        <Toggler
          innerRef={this.togglerRef}
          onMouseEnter={e => {
            e.stopPropagation()
            this.setHovered()
          }}
          onMouseLeave={e => {
            e.stopPropagation()
            this.unsetHovered()
          }}
          isHovered={isTogglerHovered}
          isFolded={isFolded}
          onClick={this.toggle}
        />
      ),
      isFolded,
    })
  }
}

export default Foldable
