import { useRef, useState, useEffect, useCallback } from "react"
import { useUniqueId } from "../useUniqueId"

export interface UseListboxOptions {
  itemCount: number
  isMultiSelect?: boolean
  isDisabled?: boolean
  initiallyOpen?: boolean
}

/**
 * A low-level hook that implements the WAI-ARIA 1.1 specification for
 * a listbox. This hook only implements a part of the specification,
 * leaving other stateful parts up to the consumer: particularly the
 * parts involving state and multiselect capabilities.
 */
export const useListbox = ({
  itemCount,
  isMultiSelect = false,
  isDisabled = false,
  initiallyOpen = false,
}: UseListboxOptions) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLDivElement>(null)
  const [isOpen, _setIsOpen] = useState(initiallyOpen)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null | undefined>()
  const id = useUniqueId()

  useEffect(() => {
    const node = buttonRef.current
    if (node) {
      if (focusedOptionIndex === null) {
        node.focus()
        return
      }
      const activeChild = node.querySelector<HTMLElement>(`[id="${id}-${focusedOptionIndex}"]`)
      if (activeChild) {
        activeChild.focus()
      }
    }
  }, [focusedOptionIndex])

  const getNextOptionIndex = useCallback(
    direction => {
      if (focusedOptionIndex === undefined || focusedOptionIndex === null) {
        return 0
      }
      switch (direction) {
        case "down":
          if (focusedOptionIndex === itemCount - 1) {
            return itemCount - 1
          }
          if (focusedOptionIndex === null) {
            return 0
          }
          return focusedOptionIndex + 1
        case "up":
          if (focusedOptionIndex === 0) {
            return 0
          }
          if (focusedOptionIndex === null) {
            return 0
          }
          return focusedOptionIndex - 1
        default:
          return 0
      }
    },
    [focusedOptionIndex, itemCount],
  )

  const setIsOpen = useCallback(
    (value: boolean) => {
      _setIsOpen(value)
      if (value === true && !focusedOptionIndex) {
        setFocusedOptionIndex(0)
      }
    },
    [focusedOptionIndex],
  )

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case "Enter":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else if (!isMultiSelect) {
            setIsOpen(false)
          }
          return

        case "ArrowDown":
          e.preventDefault()
          e.stopPropagation()
          if (!isOpen) {
            setIsOpen(true)
            return
          }
          setFocusedOptionIndex(getNextOptionIndex("down"))
          return

        case "ArrowUp":
          e.preventDefault()
          e.stopPropagation()
          if (!isOpen) {
            setIsOpen(true)
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
          setFocusedOptionIndex(itemCount - 1)
          return

        case "Escape":
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(false)
          setFocusedOptionIndex(null)
          return

        default:
          return
      }
    },
    [isOpen, focusedOptionIndex],
  )

  const handleButtonClick = useCallback(
    e => {
      const node = buttonRef.current
      if (e.target === node) {
        _setIsOpen(!isOpen)
      }
    },
    [isOpen],
  )

  useEffect(() => {
    const node = buttonRef.current

    if (node) {
      node.addEventListener("keydown", handleKeyDown)
      node.addEventListener("click", handleButtonClick)
    }
    return () => {
      if (node) {
        node.removeEventListener("keydown", handleKeyDown)
        node.removeEventListener("click", handleButtonClick)
      }
    }
  }, [handleKeyDown])

  if (itemCount < 1) {
    return {}
  }

  return {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    buttonProps: {
      ref: buttonRef,
      tabIndex: isDisabled ? -1 : 0,
      role: "button",
      "aria-expanded": isOpen,
      "aria-haspopup": "listbox" as "listbox",
      "aria-disabled": Boolean(isDisabled),
    },
    listboxProps: {
      ref: listboxRef,
      role: "listbox",
      // tabIndex: -1,
      ...(focusedOptionIndex !== null && {
        "aria-activedescendant": isOpen ? `${id}-${focusedOptionIndex}` : undefined,
      }),
      style: !isOpen ? { display: "none" } : undefined,
    },
    getChildProps: (childItemIndex: number) => ({
      "aria-selected": focusedOptionIndex === childItemIndex ? true : undefined,
      role: "option",
      id: `${id}-${childItemIndex}`,
    }),
    focusedOptionIndex: focusedOptionIndex,
    setFocusedOptionIndex,
  }
}
