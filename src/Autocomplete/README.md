### Simple Usage

This is an autocomplete in its most common usage pattern.

```jsx
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
;<div style={{ display: "flex", alignItems: "flex-start" }}>
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

  {state.chosenDog && (
    <img alt={state.chosenDog.label} src={state.chosenDog.value} style={{ marginLeft: 8, width: 100 }} />
  )}
</div>
```

### Alternate Behavior: Hold Chosen Value

In some cases, we'd want our `Autocomplete`s to hold on to the value selected, allowing the user to clear the value. Here's what that looks like.

```jsx
updateSearch = text => {
  // You can even debounce this.
  setState({ search: text })
  if (text.length > 3) {
    setState({ loading: true })
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(results => results.json())
      .then(data =>
        setState({
          data: data.results
            .filter(({ name }) => ~name.indexOf(text))
            .map(({ name, url }) => ({ label: name, value: url })),
          loading: false,
        }),
      )
  } else {
    setState({ data: undefined })
  }
}
;<div style={{ display: "flex", alignItems: "flex-start" }}>
  <Autocomplete
    fullWidth
    value={state.search}
    loading={state.loading}
    resultIcon="Add"
    results={state.data}
    noResultsMessage="No result Found"
    placeholder="Search for Pokémon..."
    selectedResult={state.chosenPokemon}
    label="Find a Pokémon..."
    hint={`Try "char"`}
    clear={state.chosenPokemon && (() => setState({ search: undefined, chosenPokemon: undefined }))}
    onChange={updateSearch}
    onResultClick={result => {
      fetch(result.value)
        .then(response => response.json())
        .then(pokemon =>
          setState({
            search: result.label,
            chosenPokemon: { ...result, value: pokemon.sprites.front_default },
          }),
        )
    }}
  />

  {state.chosenPokemon && (
    <img alt={state.chosenPokemon.label} src={state.chosenPokemon.value} style={{ marginLeft: 8, width: 100 }} />
  )}
</div>
```
