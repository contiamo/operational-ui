# Marathon

An in-browser only, exploratory test runner. Run DOM operations, make assertions on HTML attribute values, and catch visual bugs with dead-simple, familiar syntax and no mocking.

## Usage

Define a test like so:

```js
const test = ({ container, test, expect }) => {
  container.innerHTML = "<p>Hello</p>"

  test("injected some html", () => {
    expect(container.querySelector("p").innerText).toBe("Hello")
  })
}
```

Available test environment methods:

- `test`: may be used synchronously or with the `done` callback (promises not supported)
- `expect`: only `.toBe` method is supported, checking shallow equality (primitives recommended)
- `beforeEach`
- `afterEach`
- `beforeAll`
- `afterAll`

Run it inside marathon:

```
import Marathon from "./Marathon"

const MyTester = () => (
  <Marathon test={test} timeout={2000}>
    {/* Marathon takes a single function as a child */}
    {({ results, ref }) => (
      <div>
        {results.map((result, index) => (
          <p>
            <span>{result.isCompleted ? (result.errors.length > 0 ? "X" : "✓") : "..."}</span>
            <span>{result.description}</span>
          </p>
        ))}
        {/* Define the dom container to run your test in
          * DOM operations will break if you don't wire this up.
          */}
        <div ref={ref} />
      </div>
    )}
  </Marathon>
)
```

The test will start automatically once the component is rendered, and run DOM operations and assertions in the `test` calls sequentially with the specified `timeout`, defaulting to 2 seconds.

## TypeScript

The public API is fully typed. Here is how types can be introduced to the previous examples:

```
const test = ({ container, test, expect }: MarathonEnvironment) => {
  /* ... */
}
```

```
<Marathon test={test} timeout={2000}>
  {({ results, ref }: MarathonRenderer) => (
  )}
</Marathon>
```
