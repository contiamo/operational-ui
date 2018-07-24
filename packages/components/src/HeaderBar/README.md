This bar composes the top frame of Contiamo UIs. [More Info](https://github.com/contiamo/operational-ui/issues/475).

## Usage

Below is the most common usage, across all of our apps at Contiamo.

```jsx
const projectOptions = [
  { key: "project1", label: "Project 1" },
  { key: "project2", label: "Project 2" },
  { key: "project3", label: "Project 3" },
]
;<HeaderBar
  logo={<ContiamoLogo />}
  main={<Select naked options={[{ value: "Contiamo" }]} value="Contiamo" placeholder="Select Project..." />}
  end={
    <HeaderMenu items={projectOptions} align="right">
      Imogen Mason <Avatar name="Imogen Mason" />
    </HeaderMenu>
  }
/>
```
