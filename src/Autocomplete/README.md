### Simple Usage

This is an autocomplete in its most common usage pattern.

```jsx
import * as React from "react"
import { Autocomplete } from "@operational/components"

const MyComponent = () => {
  const [text, setText] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [dogToFetch, setDogToFetch] = React.useState("")
  const [chosenDog, setChosenDog] = React.useState(null)

  // Fetch data when a user enters text
  React.useEffect(() => {
    if (text.length) {
      setLoading(true)
      fetch("https://dog.ceo/api/breeds/list")
        .then(results => results.json())
        .then(results => {
          setData(
            results.message
              .filter(name => name.includes(text))
              .map(breed => ({ label: breed, value: `https://dog.ceo/api/breed/${breed}/images` })),
          )

          setLoading(false)
        })
    } else {
      setData(null)
    }
  }, [text])

  // Fetch a dog breed when a user clicks a dog
  React.useEffect(() => {
    fetch(dogToFetch)
      .then(response => response.json())
      .then(dogImage => {
        setText("")
        setChosenDog({ value: dogImage.message[0] })
      })
  }, [dogToFetch])

  const onResultClickUtil = React.useCallback(result => {
    const value = result.value
    setDogToFetch(value)
  }, [])

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <Autocomplete
        value={text}
        loading={loading}
        results={data}
        label="Find a Good Boye 🐶"
        hint={`Try "Husky"`}
        onChange={setText}
        onResultClick={onResultClickUtil}
      />

      {chosenDog && <img alt={chosenDog.label} src={chosenDog.value} style={{ marginLeft: 8, width: 100 }} />}
    </div>
  )
}

;<MyComponent />
```

### Alternate Behavior: Hold Chosen Value

In some cases, we'd want our `Autocomplete`s to hold on to the value selected, allowing the user to clear the value. Here's what that looks like.

```jsx
import * as React from "react"
import { Autocomplete, AddIcon } from "@operational/components"

const MyOtherComponent = () => {
  const [text, setText] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState(null)
  const [pokemonToFetch, setPokemonToFetch] = React.useState(null)
  const [chosenPokemon, setChosenPokemon] = React.useState(null)

  // Fetch a list of Pokémon on user input
  React.useEffect(() => {
    // You can even debounce this.
    if (text.length > 3) {
      setLoading(true)
      fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(results => results.json())
        .then(data => {
          setData(
            data.results
              .filter(({ name }) => name.includes(text))
              .map(({ name, url }) => ({ label: name, value: url })),
          )

          setLoading(false)
        })
    } else {
      setData(null)
    }
  }, [text])

  // Fetch a Pokémon on user choice
  React.useEffect(() => {
    if (pokemonToFetch) {
      fetch(pokemonToFetch.value)
        .then(response => response.json())
        .then(pokemon => {
          setText(pokemonToFetch.label)
          setChosenPokemon({ ...pokemonToFetch, value: pokemon.sprites.front_default })
        })
    }
  }, [pokemonToFetch])

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <Autocomplete
        fullWidth
        value={text}
        loading={loading}
        resultIcon={AddIcon}
        results={data}
        noResultsMessage="No result Found"
        placeholder="Search for Pokémon..."
        selectedResult={chosenPokemon}
        label="Find a Pokémon..."
        hint={`Try "char"`}
        clear={
          chosenPokemon &&
          (() => {
            setText("")
            setChosenPokemon(null)
          })
        }
        onChange={setText}
        onResultClick={setPokemonToFetch}
      />

      {chosenPokemon && (
        <img alt={chosenPokemon.label} src={chosenPokemon.value} style={{ marginLeft: 8, width: 100 }} />
      )}
    </div>
  )
}

;<MyOtherComponent />
```
