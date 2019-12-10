import * as React from "react"
import styled from "../utils/styled"
import { SearchIcon } from "../Icon"

export interface SearchInputProps<TCategory> {
  value: string
  placeholder?: string
  onChange: (values: { search: string; category: TCategory }) => void
  onClear?: () => void
  category?: TCategory
  categories?: TCategory[]
}

export function SearchInput<T = never>(props: SearchInputProps<T>) {
  if (props.categories && !props.categories.includes(props.category!)) {
    throw new Error("[SearchInput] `categories` and `category` props doesn't match!")
  }

  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <Container
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    >
      <SearchIcon color="color.text.default" size={16} />
      <Input
        ref={inputRef}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e =>
          props.onChange({
            search: e.target.value,
            category: props.category!, // Force the type-safety of `category` in the public API (this will be `never` if no `categories` are provided)
          })
        }
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  cursor: text;
  grid-template-columns: min-content auto;
  border: 1px solid transparent; /* Avoid jump with hover state */
  border-bottom: 1px solid ${({ theme }) => theme.color.separators.light};
  gap: ${({ theme }) => theme.space.content}px;
  padding: ${({ theme }) => theme.space.content}px;
  align-items: center;
  height: 48px;
  margin-bottom: ${({ theme }) => theme.space.content}px;

  transition: ease-in-out border 0.2s;

  :hover {
    border: 1px solid ${({ theme }) => theme.color.separators.light};
  }

  :focus-within {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`

const Input = styled.input`
  appearance: none;
  border: 0;
  font-size: ${({ theme }) => theme.font.size.body}px;
  font-family: ${({ theme }) => theme.font.family.main};
  color: ${({ theme }) => theme.color.text.default};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.color.text.disabled};
  }
`

export default SearchInput
