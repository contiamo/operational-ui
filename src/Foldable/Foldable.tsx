import * as React from "react"
import Toggler, { TogglerProps } from "./Foldable.Toggler"

export interface FoldableProps {
  /** Should the foldable children be open or closed by default? */
  initialState?: "closed" | "open"
  children: ({
    Toggler,
    isFolded,
  }: {
    Toggler: React.ComponentType<TogglerProps>
    isFolded: boolean
  }) => React.ReactNode
}

const Foldable = (props: FoldableProps) => {
  const { initialState = "open", children } = props
  const togglerRef = React.createRef<HTMLDivElement>()
  const [isParentFolded, setIsFolded] = React.useState(initialState === "closed")
  const [isTogglerHovered, setIsTogglerHovered] = React.useState(false)

  /**
   * Why do we listen on mouse move? Because mouse events in succession
   * (like a rapid enter/leave on Toggler) get lost. This is a known
   * shortfall with browsers' event systems.
   *
   * So, as a workaround, we watch the mouse as it spans the `document`
   * and if it's _not_ on a Toggler, set `isTogglerHovered` false on the
   * state.
   */
  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  })

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
  const handleMouseMove = (e: Event) => {
    // If we don't have a ref to the Toggler, there's nothing to do.
    if (togglerRef.current === null) {
      return
    }
    if (
      // Is STILL active, and
      isTogglerHovered &&
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
        .includes(togglerRef.current.className)
    ) {
      // Unset the hovered state because a mouseleave most likely got lost.
      unsetHovered()
    }
  }

  const toggle = () => {
    setIsFolded(state => !state)
  }

  const setHovered = () => {
    setIsTogglerHovered(true)
  }

  const unsetHovered = () => {
    setIsTogglerHovered(true)
  }

  return children({
    Toggler: ({ onClick, isFolded }) => (
      <Toggler
        innerRef={togglerRef}
        onMouseEnter={e => {
          e.stopPropagation()
          setHovered()
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          unsetHovered()
        }}
        isHovered={isTogglerHovered}
        isFolded={typeof isFolded === "undefined" ? isParentFolded : Boolean(isFolded)}
        onClick={onClick || toggle}
      />
    ),
    isFolded: isParentFolded,
  })
}

export default Foldable
