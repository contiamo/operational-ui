import * as React from "react"
import styled from "../utils/styled"
import { SearchIcon, CaretDownIcon, CaretUpIcon, EnterIcon } from "../Icon"
import { lighten } from "../utils"
import useHotkey from "../useHotkey"

export interface SearchInputProps<TCategory> {
  value: string
  placeholder?: string
  onChange: (values: { search: string; category: TCategory }) => void
  onClear?: () => void
  category?: TCategory
  categories?: TCategory[]
}

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
    if (isOpen && setIsOpen) {
      const hideOnScroll = () => setIsOpen(false)
      document.addEventListener("scroll", hideOnScroll)
      return () => {
        document.removeEventListener("scroll", hideOnScroll)
      }
    }
  }, [isOpen, setIsOpen])

  const [activeItemIndex, setActiveItemIndex] = React.useState(0)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useHotkey(containerRef, { key: "ArrowDown" }, () => {
    if (!isOpen) {
      setIsOpen(true)
    }
    setActiveItemIndex(prev => (prev + 1) % (props.categories || []).length)
  })

  useHotkey(containerRef, { key: "ArrowUp" }, () =>
    setActiveItemIndex(prev =>
      prev === 0 ? (props.categories || []).length : (prev - 1) % (props.categories || []).length,
    ),
  )

  useHotkey(containerRef, { key: "Enter" }, () => {
    if (!props.categories || !props.category) {
      return
    }
    props.onChange({ search: props.value, category: props.categories[activeItemIndex] })
    setIsOpen(false)
  })

  useHotkey(containerRef, { key: "Escape" }, () => setIsOpen(false))

  if (props.categories && !props.categories.includes(props.category!)) {
    throw new Error("[SearchInput] `categories` and `category` props doesn't match!")
  }

  return (
    <Container
      ref={containerRef}
      hasCategory={Boolean(props.category)}
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
      <SearchIcon color="color.text.default" size={16} />
      {props.category && (
        <CategoryDropdown onClick={toggleOpen}>
          {props.category}
          {isOpen ? <CaretDownIcon size={5} /> : <CaretUpIcon size={5} />}
        </CategoryDropdown>
      )}
      <Input
        ref={inputRef}
        value={props.value}
        aria-label="search"
        placeholder={props.placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={e => {
          setIsOpen(true)
          props.onChange({
            search: e.target.value,
            category: props.category!, // Force the type-safety of `category` in the public API (this will be `never` if no `categories` are provided)
          })
        }}
      />
      {isOpen && props.categories && (
        <DropdownContainer aria-activedescendant={`category-${props.categories[activeItemIndex]}`} role="listbox">
          {props.categories.map((category, index) => (
            <DropdownItem
              isActive={activeItemIndex === index}
              aria-selected={activeItemIndex === index ? "true" : undefined}
              aria-roledescription="Category"
              aria-label={category}
              id={`category-${category}`}
              role="option"
              key={category}
              onClick={e => {
                if (props.value) {
                  setIsOpen(false)
                  e.stopPropagation()
                }
                props.onChange({ search: props.value, category })
              }}
            >
              <div /* Icon spacing */ />
              <CategoryDropdown highlighted>
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

const Container = styled.div<{ hasCategory: boolean; isOpen: boolean }>`
  display: grid;
  cursor: text;
  grid-template-columns: ${props => (props.hasCategory ? "16px min-content auto" : "16px auto")};
  border: 1px solid transparent; /* Avoid jump with hover state */
  border-bottom: 1px solid ${({ theme }) => theme.color.separators.light};
  gap: ${({ theme, hasCategory }) => theme.space.content + (hasCategory ? 8 : 0)}px;
  padding: 0 ${({ theme }) => theme.space.content}px;
  align-items: center;
  height: 48px;
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

const CategoryDropdown = styled.div<{ highlighted?: boolean }>`
  font-size: ${({ theme }) => theme.font.size.body}px;
  font-family: ${({ theme }) => theme.font.family.main};
  color: ${({ theme }) => theme.color.text.default};
  padding: ${({ theme }) => theme.space.small}px;
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

const DropdownItem = styled.div<{ isActive: boolean }>`
  height: 48px;
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 16px min-content auto;
  grid-gap: ${({ theme }) => theme.space.content + 8}px;
  padding: 0 ${({ theme }) => theme.space.content}px;
  cursor: pointer !important;

  ${({ isActive }) => (isActive ? "" : ":hover {")}
    background-color: ${({ theme }) => theme.color.background.lightest};

    > div {
      background-color: ${({ theme }) => theme.color.background.grey}; /* CategoryDropdown */
    }
  ${({ isActive }) => (isActive ? "" : "}")}
`

const Input = styled.input`
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

export default SearchInput
