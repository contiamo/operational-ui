import * as React from "react"
import styled from "../utils/styled"
import { SearchIcon, CaretDownIcon, CaretUpIcon, EnterIcon, NoIcon } from "../Icon"
import { lighten } from "../utils"
import useHotkey from "../useHotkey"
import Chip from "../Chip/Chip"

export interface SearchInputProps<TCategory> {
  value: string
  placeholder?: string
  onChange: (values: { search: string; category: TCategory }) => void
  onClear?: () => void
  category?: TCategory
  categories?: TCategory[]
  readonly?: boolean
  condensed?: boolean
}

const getIconWidth = (isCondensed: boolean) => (isCondensed ? 12 : 16)

export function SearchInput<T extends string = never>(props: SearchInputProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation()
      setIsOpen(i => !i)
    },
    [setIsOpen],
  )

  React.useEffect(() => {
    if (isOpen) {
      const hideOnScroll = () => setIsOpen(false)
      document.addEventListener("scroll", hideOnScroll)
      return () => {
        document.removeEventListener("scroll", hideOnScroll)
      }
    }
  }, [isOpen, setIsOpen])

  const [activeItemIndex, setActiveItemIndex] = React.useState(0)
  const [focusEl, setFocusEl] = React.useState<"clearIcon" | null>(null)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useHotkey(containerRef, { key: "ArrowDown" }, () => {
    setIsOpen(true)
    setActiveItemIndex(prev => (prev + 1) % (props.categories || []).length)
  })

  useHotkey(containerRef, { key: "ArrowUp" }, () =>
    setActiveItemIndex(prev => {
      const length = (props.categories || []).length
      const previousIndex = prev - 1
      return previousIndex < 0 ? length - 1 : previousIndex
    }),
  )

  useHotkey(containerRef, { key: "Enter" }, () => {
    if (focusEl === "clearIcon" && props.onClear) {
      props.onClear() // Handle keyboard interaction for clear icon
      return
    }
    if (!props.categories || !props.category) {
      return
    }
    props.onChange({ search: props.value, category: props.categories[activeItemIndex] })
    setIsOpen(false)
  })

  useHotkey(containerRef, { key: "Escape" }, () => {
    setIsOpen(false)
    if (props.category && props.categories) {
      const activeCategoryIndex = props.categories.findIndex(i => i === props.category)
      setActiveItemIndex(activeCategoryIndex)
    }
  })

  if (!props.value && props.onClear && focusEl === "clearIcon") {
    setFocusEl(null) // Clear focus state if the element is not on the screen
  }

  if (props.categories && !props.categories.includes(props.category!)) {
    throw new Error("[SearchInput] `categories` and `category` props don't match!")
  }

  return (
    <Container
      ref={containerRef}
      isCondensed={Boolean(props.condensed)}
      hasCategory={Boolean(props.category)}
      isClearable={Boolean(props.value && props.onClear)}
      isOpen={isOpen}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    >
      {isOpen && (
        /**
         * Why do we have two `InvisibleOverlay`?
         * Because we can focus with tab in two different directions!
         * So we need to trap the focus before and after our `Input`
         */
        <InvisibleOverlay
          onClick={e => {
            e.stopPropagation()
            setIsOpen(false)
          }}
          onFocus={() => setIsOpen(false)} /* Close dropdown if the focus is away */
          tabIndex={0}
          aria-hidden="true"
        />
      )}
      {props.readonly ? (
        <ReadonlyChip columnSize={2 + (props.category ? 1 : 0) + (props.onClear ? 1 : 2)}>{props.value}</ReadonlyChip>
      ) : (
        <>
          <SearchIcon color="color.text.default" size={getIconWidth(Boolean(props.condensed))} />
          {props.category && (
            <CategoryDropdown onClick={toggleOpen} isCondensed={Boolean(props.condensed)}>
              {props.category}
              {isOpen ? <CaretUpIcon size={5} /> : <CaretDownIcon size={5} />}
            </CategoryDropdown>
          )}
          <Input
            ref={inputRef}
            value={props.value}
            aria-label="search"
            placeholder={props.placeholder}
            onChange={e => {
              props.onChange({
                search: e.target.value,
                category: props.category!, // Force the type-safety of `category` in the public API (this will be `never` if no `categories` are provided)
              })
            }}
          />
        </>
      )}
      {props.value && props.onClear && (
        <ClearIcon
          onClick={props.onClear}
          size={props.condensed ? 16 : 18}
          color="color.text.default"
          onFocus={() => setFocusEl("clearIcon")}
          onBlur={() => setFocusEl(null)}
        />
      )}
      {isOpen && props.categories && (
        <DropdownContainer aria-activedescendant={`category-${props.categories[activeItemIndex]}`} role="listbox">
          {props.categories.map((category, index) => (
            <DropdownItem
              isCondensed={Boolean(props.condensed)}
              isActive={activeItemIndex === index}
              aria-selected={activeItemIndex === index ? "true" : undefined}
              aria-roledescription="Category"
              aria-label={category}
              id={`category-${category}`}
              role="option"
              key={category}
              onClick={e => {
                setIsOpen(false)
                setActiveItemIndex(index)
                e.stopPropagation()
                props.onChange({ search: props.value, category })
              }}
            >
              <div /* Icon spacing */ />
              <CategoryDropdown highlighted isCondensed={Boolean(props.condensed)}>
                {category}
                <EnterIcon size={8} />
              </CategoryDropdown>
              {props.value}
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}
      {isOpen && (
        <InvisibleOverlay
          onClick={e => {
            e.stopPropagation()
            setIsOpen(false)
          }}
          onFocus={() => setIsOpen(false)} /* Close dropdown if the focus is away */
          tabIndex={0}
          aria-hidden="true"
        />
      )}
    </Container>
  )
}

const Container = styled.div<{ hasCategory: boolean; isOpen: boolean; isClearable: boolean; isCondensed: boolean }>`
  display: grid;
  cursor: text;
  grid-template-columns: ${props => {
    const iconWidth = getIconWidth(props.isCondensed)
    const clearIconZone = props.isClearable ? ` ${iconWidth}px` : ""
    return props.hasCategory ? `${iconWidth}px min-content auto${clearIconZone}` : `${iconWidth}px auto${clearIconZone}`
  }};
  border: 1px solid ${({ theme, isCondensed }) => (isCondensed ? theme.color.separators.light : "transparent")}; /* Avoid jump with hover state */
  border-bottom: 1px solid ${({ theme }) => theme.color.separators.light};
  grid-gap: ${({ theme, hasCategory, isCondensed }) =>
    (isCondensed ? theme.space.small : theme.space.content) +
    (hasCategory
      ? theme.space.small
      : 0)}px; /* The offset is for the separator extra width (CategoryDropdown:after.width) */
  padding: 0 ${({ theme, isCondensed }) => (isCondensed ? theme.space.small : theme.space.content)}px;
  align-items: center;
  height: ${props => (props.isCondensed ? 36 : 48)}px;
  margin-bottom: ${({ theme }) => theme.space.content}px;

  transition: ease-in-out border 0.2s;
  position: relative;

  :hover {
    border: 1px solid ${({ theme }) => theme.color.separators.light};
  }

  ${({ isOpen, theme }) => isOpen && `border: 1px solid ${theme.color.primary};`}

  :focus-within {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`

const CategoryDropdown = styled.div<{ highlighted?: boolean; isCondensed?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.body}px;
  font-family: ${({ theme }) => theme.font.family.main};
  color: ${({ theme }) => theme.color.text.default};
  padding: ${({ theme, isCondensed }) => (isCondensed ? theme.space.base : theme.space.small)}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  z-index: ${({ theme }) => theme.zIndex.selectOptions}; /* Ensure to be on top of the InvisibleOverlay */
  min-width: 150px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  ${({ highlighted, theme }) => (highlighted ? `background-color: ${theme.color.background.lighter};` : "")}

  :hover {
    background-color: ${({ theme, highlighted }) =>
      highlighted ? theme.color.background.grey : lighten(theme.color.primary, 54)};
    color: ${({ theme, highlighted }) => (highlighted ? theme.color.basic : theme.color.primary)};
  }

  :after {
    content: "";
    position: absolute;
    width: ${({ theme }) => theme.space.small}px;
    height: 24px;
    border-right: 1px solid ${({ theme }) => theme.color.separators.light};
    left: 100%;
  }
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: -1px; /* border offset hack */
  width: calc(100% + 2px);
  z-index: ${({ theme }) => theme.zIndex.selectOptions};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.separators.light};
`

const DropdownItem = styled.div<{ isActive: boolean; isCondensed: boolean }>`
  height: ${props => (props.isCondensed ? 36 : 48)}px;
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: ${props => getIconWidth(props.isCondensed)}px min-content auto;
  grid-gap: ${({ theme, isCondensed }) =>
    (isCondensed ? theme.space.small : theme.space.content) +
    theme.space.small}px; /* Same as Container.grid-gap (with category) to be aligned */
  padding: 0 ${({ theme, isCondensed }) => (isCondensed ? theme.space.small : theme.space.content)}px;
  cursor: pointer !important;

  ${({ isActive }) => (isActive ? "" : ":hover {")}
    background-color: ${({ theme }) => theme.color.background.lightest};

    > div {
      background-color: ${({ theme }) => theme.color.background.grey}; /* CategoryDropdown */
    }
  ${({ isActive }) => (isActive ? "" : "}")}
`

const Input = styled.input`
  width: 100%;
  appearance: none;
  border: 0;
  font-size: ${({ theme }) => theme.font.size.body}px;
  font-family: ${({ theme }) => theme.font.family.main};
  color: ${({ theme }) => theme.color.text.default};
  z-index: ${({ theme }) => theme.zIndex.selectOptions}; /* Ensure to be on top of the InvisibleOverlay */

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.color.text.disabled};
  }
`

const InvisibleOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: default;
  z-index: ${({ theme }) => theme.zIndex.selectOptions - 1};
`

const ClearIcon = styled(NoIcon)`
  z-index: ${({ theme }) => theme.zIndex.selectOptions}; /* Ensure to be on top of the InvisibleOverlay */
`

const ReadonlyChip = styled(Chip)<{ columnSize: number }>`
  grid-column: 1 / ${props => props.columnSize};
  width: 100%;
`

export default SearchInput
