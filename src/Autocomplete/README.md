### Single value search

```jsx
updateSearch = text => {
  // You can even debounce this.
  setState({ search: text })
  if (text.length > 3) {
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
;<div style={{ display: "flex", alignItems: "flex-start" }}>
  <Autocomplete
    value={state.search}
    loading={state.loading}
    resultIcon="Add"
    results={state.data}
    noResultsMessage="No result Found"
    onResultClick={result => {
      fetch(result.value)
        .then(response => response.json())
        .then(dogImage => setState({ chosenDog: { ...result, value: dogImage.message[0] } }))
    }}
    onChange={updateSearch}
    label="Find a Good Boye 🐶"
    hint={`Try "Husky"`}
  />

  {state.chosenDog && (
    <img alt={state.chosenDog.label} src={state.chosenDog.value} style={{ marginLeft: 8, width: 100 }} />
  )}
</div>
```
