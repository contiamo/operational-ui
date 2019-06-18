## Usage:

```jsx
import { useListbox, Button } from "@operational/components"

const MyComponent = props => {
  const { isOpen, setIsOpen, parentProps, getChildProps } = useListbox({ itemCount: props.listItems.length })

  return (
    <div {...parentProps}>
      <Button onClick={() => setIsOpen(!isOpen)} color="primary">
        Hit it, Lionel!
      </Button>
      {isOpen &&
        props.listItems.map((option, index) => (
          <div
            onKeyDown={e => {
              e.preventDefault()
              if (e.key === " ") {
                alert(option)
              }
            }}
            onClick={x => alert(option)}
            key={index}
            {...getChildProps(index)}
          >
            {option}
          </div>
        ))}
    </div>
  )
}

;<MyComponent listItems={"hello, is it me you're looking for 🎤".split(" ")} />
```

A low-level hook that implements the WAI-ARIA 1.1 specification for
a listbox. This hook only implements a part of the specification,
leaving other stateful parts up to the consumer: particularly the
parts involving state and multiselect capabilities.
