import { useRef, useState, useEffect, useCallback } from "react"

/**
 * ## Usage:
 *
 * ```jsx
 * const MyComponent = (props) => {
 *  const [isOpen, parentProps, getChildProps] = useListBox(props.listItems.length);
 *  return (
 *      <Select {...parentProps}>
 *          {options.map(option => <Option key={option.id} {...getChildProps(index)} />)}
 *      </Select>
 *  );
 * }
 * ```
 *
 * A low-level hook that implements the WAI-ARIA 1.1 specification for
 * a listbox. This hook only implements a part of the specification,
 * leaving other stateful parts up to the consumer: particularly the
 * parts involving state and multiselect capabilities.
 */
export const useListbox = (numberOfOptions: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, _setIsOpen] = useState(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState()

  useEffect(() => {
    const node = containerRef.current
    if (node) {
      if (focusedOptionIndex === null) {
        node.focus()
        return
      }
      const activeChild = node.querySelector<HTMLElement>('[tabindex="0"]')
      if (activeChild) {
        activeChild.focus()
      }
    }
  }, [focusedOptionIndex])

  const getChildTabIndex = useCallback(i => (focusedOptionIndex === i ? 0 : -1), [focusedOptionIndex])

  const getNextOptionIndex = useCallback(
    direction => {
      switch (direction) {
        case "down":
          if (focusedOptionIndex === numberOfOptions - 1) {
            return 0
          }
          if (focusedOptionIndex === null) {
            return 0
          }
          return focusedOptionIndex + 1
        case "up":
          if (focusedOptionIndex === 0) {
            return numberOfOptions - 1
          }
          if (focusedOptionIndex === null) {
            return 0
          }
          return focusedOptionIndex - 1
        default:
          return 0
      }
    },
    [focusedOptionIndex, numberOfOptions],
  )

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case "Enter":
          e.preventDefault()
          e.stopPropagation()
          if (!isOpen) {
            _setIsOpen(true)
            setFocusedOptionIndex(0)
          } else {
            _setIsOpen(false)
            setFocusedOptionIndex(null)
          }
          return

        case "ArrowDown":
          e.preventDefault()
          e.stopPropagation()
          if (!isOpen) {
            _setIsOpen(true)
            setFocusedOptionIndex(0)
            return
          }
          setFocusedOptionIndex(getNextOptionIndex("down"))
          return

        case "ArrowUp":
          e.preventDefault()
          e.stopPropagation()
          if (!isOpen) {
            _setIsOpen(true)
            setFocusedOptionIndex(numberOfOptions - 1)
            return
          }
          setFocusedOptionIndex(getNextOptionIndex("up"))
          return

        case "Home":
          e.preventDefault()
          e.stopPropagation()
          setFocusedOptionIndex(0)
          return

        case "End":
          e.preventDefault()
          e.stopPropagation()
          setFocusedOptionIndex(numberOfOptions - 1)
          return

        case "Escape":
          e.preventDefault()
          e.stopPropagation()
          _setIsOpen(false)
          setFocusedOptionIndex(null)
          return

        default:
          return
      }
    },
    [isOpen, getNextOptionIndex, numberOfOptions],
  )

  const handleClick = useCallback(
    e => {
      const node = containerRef.current
      if (e.target === node) {
        _setIsOpen(!isOpen)
      }
    },
    [isOpen],
  )

  useEffect(() => {
    const node = containerRef.current

    if (node) {
      node.addEventListener("keydown", handleKeyDown)
      node.addEventListener("click", handleClick)
    }
    return () => {
      if (node) {
        node.removeEventListener("keydown", handleKeyDown)
        node.removeEventListener("click", handleClick)
      }
    }
  }, [handleKeyDown])

  const setIsOpen = useCallback(
    (value: boolean) => {
      _setIsOpen(value)
      if (value === true && !focusedOptionIndex) {
        setFocusedOptionIndex(0)
      }
    },
    [focusedOptionIndex],
  )

  if (numberOfOptions < 1) {
    return [false, () => {}, {}, () => {}] as const
  }

  return [
    isOpen,
    setIsOpen,
    {
      ref: containerRef,
      tabIndex: 0,
      role: "listbox",
      "aria-expanded": isOpen,
    },
    (childItemIndex: number) => ({
      tabIndex: getChildTabIndex(childItemIndex),
      role: "option",
    }),
  ] as const
}
