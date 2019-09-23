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
  }) => React.ReactElement
}

const Foldable = ({ initialState = "open", children }: FoldableProps) => {
  const $toggler = React.useRef<HTMLDivElement>(null)
  const [isParentFolded, setIsFolded] = React.useState(initialState === "closed")
  const [isTogglerHovered, setIsTogglerHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: any) => {
      if ($toggler.current === null) {
        return
      }
      if (isTogglerHovered && !e.path.map((el: HTMLElement) => el.className).includes($toggler.current.className)) {
        setIsTogglerHovered(false)
      }
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [isTogglerHovered])

  return children({
    Toggler: ({ onClick, isFolded }) => (
      <Toggler
        onMouseEnter={e => {
          e.stopPropagation()
          setIsTogglerHovered(true)
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          setIsTogglerHovered(false)
        }}
        isHovered={isTogglerHovered}
        isFolded={typeof isFolded === "undefined" ? isParentFolded : Boolean(isFolded)}
        onClick={onClick || (() => setIsFolded(prevState => !prevState))}
      />
    ),
    isFolded: isParentFolded,
  })
}

export default Foldable
