## Usage

useDebouncedCallbacks- debounces callbacks

```jsx
//import useDebouncedCallbacks from '@operational/ui/src/useDebouncedCallbacks';
const MyComponent = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue)
  // Debounce callback
  const debouncedCallback = useDebouncedCallback(
    v => {
      setValue(v)
    },
    2000,
    [],
  )
  return (
    <div>
      <input defaultValue={defaultValue} onChange={e => debouncedCallback(e.target.value)} />
      <p>Debounced value: {value}</p>
    </div>
  )
}

;<MyComponent defaultValue={1} />
```
