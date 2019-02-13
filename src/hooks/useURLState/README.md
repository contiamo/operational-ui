It's quite convenient to be able to copy and paste a link to somebody to show them a particular page of your application.

It's even more convenient if this link has the state of the current page! This is what this hook is made for.

Disclaimer: when we say synchronized, we don't mean two way binding. It will read initial state from URL on component mount, but after internal state will be source of truth. Which is ok most of the time, because we use `replaceState` and there is no way from user point of view to change URL without triggering page reload. The only edge case to be aware here is when you use `useURLState` with `pushState`, in this case you will need to make sure that component lives inside a valid router context.

Because the URL is not really the safest way to provide state to an application, you are encouraged to provide a `decoder` function that will validate and parse the input from the URL to your state. If the input from the URL is invalid, simply return a reasonable fallback.

## Usage

```jsx
const countDecoder = i => (isNaN(+i) ? undefined : +i)

const Counter = () => {
  // this is sync with `?count={number}`
  // you can try to reload the page to see that the state is retain
  const [count, setCount] = useURLState("count", 0, countDecoder)

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
