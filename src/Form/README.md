### Usage

```jsx
const { name, gitUrl, branch, isCreating, isValid } = {
  name: "my bundle",
  gitUrl: "git://github.com/me/my-bundle",
  branch: "master",
}
;<Form>
  <Input label="Name" value={name} />
  <Input label="Git URL" value={gitUrl} />
  <Input label="Branch" value={branch} />
  <Button color="primary">Import</Button>
</Form>
```

### With group

For grouping some elements together in one line, just wrap them in a simple `div`

```jsx
const { name, gitUrl, branch, isCreating, isValid } = {
  name: "my bundle",
  gitUrl: "git://github.com/me/my-bundle",
  branch: "master",
}
;<Form>
  <div>
    <Input label="Name" value={name} />

    <Autocomplete
      value={state.search}
      loading={state.loading}
      results={state.data}
      label="Find a Good Boye 🐶"
      hint={`Try "Husky"`}
      onResultClick={result => {
        fetch(result.value)
          .then(response => response.json())
          .then(dogImage =>
            setState({
              search: undefined,
              chosenDog: { ...result, value: dogImage.message[0] },
            }),
          )
      }}
    />
    <Select
      label="Select label"
      value={state.value}
      options={[
        { label: "Option 1", value: "one" },
        { label: "Option 2", value: "two" },
        { label: "Option 3", value: "three" },
        { label: "Option 4", value: "four" },
        { label: "Option 5", value: "five" },
        { label: "Option 6", value: "six" },
        { label: "Option 7", value: "seven" },
        { label: "Option 8", value: "eight" },
      ]}
      filterable
      maxOptions={2}
      placeholder="Choose an option"
      onChange={newValue => {
        setState({
          value: newValue,
        })
      }}
    />
  </div>
  <div>
    <Input label="Branch" value={branch} />
    <Button color="primary">Import</Button>
  </div>
  <div>
    <Input label="Branch" value={branch} />
    <Button color="primary">Import</Button>
    <Button color="grey">Import</Button>
  </div>
  <p>This is a footer!</p>
</Form>
```

## Correct Layout for Conditionally Rendered Components

```jsx
initialState = {
  value: "one",
  mode: "select",
}

options = [
  { label: "Option 1", value: "one" },
  { label: "Option 2", value: "two" },
  { label: "Option 3", value: "three" },
  { label: "Option 4", value: "four" },
  { label: "Option 5", value: "five" },
  { label: "Option 6", value: "six" },
  { label: "Option 7", value: "seven" },
  { label: "Option 8", value: "eight" },
]

updateSearch = text => {
  // You can even debounce this.
  setState({ search: text })
  if (text.length) {
    setState({ loading: true })
    fetch("https://dog.ceo/api/breeds/list")
      .then(results => results.json())
      .then(results =>
        setState({
          data: results.message
            .filter(name => ~name.indexOf(text))
            .map(breed => ({ label: breed, value: `https://dog.ceo/api/breed/${breed}/images` })),
          loading: false,
        }),
      )
  } else {
    setState({ data: undefined })
  }
}
;<Form>
  <div>
    <Switch
      left="Select"
      right="Autocomplete"
      on={state.mode === "autocomplete"}
      onChange={() => setState({ mode: state.mode === "select" ? "autocomplete" : "select" })}
    />
    {state.mode === "select" && (
      <Select
        label="Select label"
        value={state.value}
        options={options}
        filterable
        maxOptions={2}
        placeholder="Choose an option"
        onChange={newValue => {
          setState({
            value: newValue,
          })
        }}
      />
    )}
    {state.mode === "autocomplete" && (
      <Autocomplete
        value={state.search}
        loading={state.loading}
        results={state.data}
        label="Find a Good Boye 🐶"
        hint={`Try "Husky"`}
        onChange={updateSearch}
        onResultClick={result => {
          fetch(result.value)
            .then(response => response.json())
            .then(dogImage =>
              setState({
                search: undefined,
                chosenDog: { ...result, value: dogImage.message[0] },
              }),
            )
        }}
      />
    )}
  </div>
</Form>
```
