Hook version of setInterval.

### Referece

[Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

### Usage

#### Basic Counter

```jsx
function BasicCounter() {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <h1>{count}</h1>
}

;<BasicCounter />
```

#### Using two intervals to manipulate the counter

Example, we can have a delay of one interval be controlled by another:

```jsx
function Counter() {
  const [delay, setDelay] = useState(1000)
  const [count, setCount] = useState(0)

  // Increment the counter.
  useInterval(() => {
    setCount(count + 1)
  }, delay)

  // Make it faster every second!
  useInterval(() => {
    if (delay > 10) {
      setDelay(delay / 2)
    }
  }, 1000)

  function handleReset() {
    setDelay(1000)
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <h4>Delay: {delay}</h4>
      <button onClick={handleReset}>Reset delay</button>
    </>
  )
}

;<Counter />
```

#### Immediate argument

If you need your callback to be delayed for an extended period of time, but you want it to trigger imediatley upon mounting, then pass in immediate.

```jsx
function MyComp() {
  const [inverted, setInvert] = useState(false)

  const [inverted2, setInvert2] = useState(false)

  // Invert colors Immediately
  useInterval(
    () => {
      setInvert(!inverted)
    },
    10000,
    true,
  )

  // Invert colors
  useInterval(() => {
    setInvert2(!inverted2)
  }, 10000)

  // Make it faster every second!

  return (
    <div>
      <div
        style={{
          background: inverted ? "navy" : "white",
          color: inverted ? "white" : "navy",
        }}
      >
        <h3> This immediatly gets inverted with navy BG </h3>
      </div>

      <div
        style={{
          background: inverted2 ? "navy" : "white",
          color: inverted2 ? "white" : "navy",
        }}
      >
        <h3> This needs to wait for delay to pass to make Navy </h3>
      </div>
    </div>
  )
}

;<MyComp />
```
