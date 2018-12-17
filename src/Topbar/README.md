Top bars are used as lower-level navigation elements for widgets inside applications. They have their own sub-elements such as buttons or select boxes, which it lays out on the left and right with automatically inserted separators.

### Usage

```
initialState = {
  selectedFruit: "apples"
}

;<Topbar
  left={
    <>
      <TopbarSelect
        label="Fruit"
        selected={state.selectedFruit}
        items={["apples", "oranges"].map(name => ({ label: name }))}
        onChange={newSelectedFruit => {
          setState(() => ({
            selectedFruit: newSelectedFruit
          }))
        }}
      />
      <TopbarButton
        icon="No"
      >
        Clear
      </TopbarButton>
      <TopbarButton
        icon="Undo"
      >
        Undo
      </TopbarButton>
      <TopbarButton
        icon="Redo"
        disabled
      >
        Redo
      </TopbarButton>
    </>
  }
  right={
    <>
      <TopbarButton
        icon="Save"
      >
        Save
      </TopbarButton>
    </>
  }
/>
```
