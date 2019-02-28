## Usage

useDebounce- debounces values

```jsx
//import useDebounce from "@operational/ui/src/useDebounce"

const MyComponent = () => {
  const [text, setText] = useState('defaultValue');
  const debouncedText = useDebounce(text, 1000);

  return (
    <div>
      <input defaultValue={'defaultValue'} onChange={(e) => {
        setText(e.target.value);
      }} />
      <p>Debounced value: {debouncedText}</p>
    </div>)

;<MyComponent/>
```
