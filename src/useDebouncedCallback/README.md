## Usage

Similar to UseDebounce but a debounced Callback is returned and you can do prelim calculations prior to setting the Value.

```jsx
//import useDebouncedCallbacks from '@operational/ui/src/useDebouncedCallbacks';
function UseDebouncedCBExample({ defaultValue }) {
  const [value, setValue] = useState(defaultValue)
  const debouncedFunction = useDebouncedCallback(
    value => {
      setValue(value)
    },
    2000,
    [],
  )

  return (
    <div>
      <input defaultValue={defaultValue} onChange={e => debouncedFunction(e.target.value)} />
      <p>Debounced value: {value}</p>
    </div>
  )
}

;<UseDebouncedCBExample defaultValue="Hello world" />
```
