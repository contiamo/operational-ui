A component that displays information intended to convey meaningful information about the current running environment to the end-user.

## Usage

```jsx
const { styled } = require("../../")
const UnfloatedDebug = styled(Debug)({
  /**
   * Remove the following line to see the _actual_
   * behavior, with drag & drop.
   */

  position: "static",
})
;<UnfloatedDebug
  title="Operational UI"
  values={{
    version: "8.1.0",
    built: "2018-09-14 19:30:00",
    branch: "master",
    config: {
      labs: {
        color: "red",
        backend: "https://dog.ceo/api",
      },
    },
  }}
/>
```
