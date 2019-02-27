## Usage

This hook sets up an interval and clears it after unmounting

```jsx
const MyComponent = () => {
  let [count, setCount] = React.useState(0)

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1)
  }, 1000)

  return <h1>{count}</h1>
}

;<MyComponent />
```
