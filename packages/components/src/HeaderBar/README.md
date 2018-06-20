This bar composes the top frame of Contiamo UIs. [More Info](https://github.com/contiamo/operational-ui/issues/475).

## Usage

Below is the most common usage, across all of our apps at Contiamo.

```jsx
<HeaderBar
  logo={<ContiamoLogo />}
  main={<Select naked options={[{ value: "Contiamo" }]} value="Contiamo" placeholder="Select Project..." />}
  end={<Avatar name="Tejas Kumar" />}
/>
```
