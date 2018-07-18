Progress panels indicate progress on a list of steps making up a larger process such as an installation or deployment.

### Usage

```jsx
<ProgressPanel
  items={[
    {
      status: "success",
      title: "Something",
    },
    {
      status: "failure",
      title: "Something",
      error: "Failed to fetch your account data",
    },
    {
      status: "running",
      title: "Something",
    },
    {
      status: "waiting",
      title: "Something",
    },
  ]}
/>
```
