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

  /**
   * This whole function exists to serve the following purpose:
   *
   * In case of [Example 2](/#!/Foldable), where we have two CardSections
   * side-by-side, we want to watch each mouse movement on the `document` and:
   *
   * - if we don't have a ref to the toggler,
   *  - return `undefined` early
   *
   * The rest of the function exists in order to prevent mouseleave events
   * getting lost. If a user moves the cursor on and off a toggler RAPIDLY,
   * the mouseleave event gets lost and the toggler stays "active" or grey
   * forever.
   *
   * To fix this, we do the following:
   *
   * - if the toggler is STILL active, even though the cursor is NOT on it
   *   - unset hovered state.
   */
  private handleMouseMove = (e: Event) => {
    // If we don't have a ref to the Toggler, there's nothing to do.
    if (this.togglerRef.current === null) {
      return
    }
    if (
      // Is STILL active, and
      this.state.isTogglerHovered &&
      !e

        /**
         * 's composedPath (the path between document and where
         * the cursor is right now) expressed as an array of
         * HTMLElements.
         */
        .composedPath()

        /**
         * Get their classNames. This is important for the
         * next step: comparison. We can _only_ compare by
         * className because comparing HTMLElement to HTMLElement
         * for inclusion will not be equal in this case.
         */
        .map(el => (el as HTMLElement).className)

        /**
         * If all classNames between `document` and where the
         * cursor currently is DOES NOT include a toggler but
         * (see first condition) this.state has a toggler as
         * ACTIVE,
         */
        .includes(this.togglerRef.current.className)
    ) {
      // Unset the hovered state because a mouseleave most likely got lost.
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
