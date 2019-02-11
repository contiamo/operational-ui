It's quite convenient to be able to copy and paste a link to somebody to show them a particular page of your application.

It's even more convenient if this link has the state of the current page! This is what this hook is made for.

Simply use `useSyncToPathState` instead of the classic `useState` and your props are automatically synchronized to the URL.

Because the URL is not really the safest way to provide state to an application, you need to provide an `encoder` function that validate and parse the input from the URL to your state. You need to return `undefined` if the input is not valid.

## Usage

```jsx
const countEncoder = i => {
  if (Number.isNaN(+i)) {
    return undefined
  }
  return +i
}

const Counter = () => {
  // this is sync with `?count={number}`
  // you can try to reload the page to see that the state is retain
  const [count, setCount] = useSyncToPathState("count", 0, countEncoder)

  return (
    <>
      <Title>{count}</Title>
      <Button onClick={() => setCount(count + 1)} children="up" />
      <Button onClick={() => setCount(count - 1)} children="down" />
    </>
  )
}

;<Counter />
```
