### Single value search

```jsx
const data = [
  "Homer J. Simpson",
  "Marge Simpson",
  "Bart Simpson",
  "Lisa Simpson",
  "Maggie Simpson",
  "Krusty",
  "Abraham Simpson",
  "Ned Flanders",
  "Apu Nahasapeemapetilon Jr",
  "Barney Gumble",
  "Moe Szyslak",
  "Willie",
  "Charles Montgomery Burns",
  "Tahiti Mel",
  "Jeff Albertson",
  "Martin Prince",
  "Chef Wiggum",
  "Lou",
]

// Fake `restful-react.Get` component
class Get extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      res: null,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.setState({ loading: true })

      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        this.setState({
          res: data.filter(i => i.toLowerCase().startsWith(this.props.path.slice(8).toLowerCase())),
          loading: false,
        })
      }, 1000)
    }
  }

  render() {
    return this.props.children(this.state.res, { loading: this.state.loading })
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      value: { label: "" },
    }
  }
  render() {
    return (
      <Get path={`?search=${this.state.search}`}>
        {(data, { loading }) => (
          <Autocomplete
            value={this.state.search}
            loading={loading}
            results={data}
            noResultsMessage="No result Found"
            onResultClick={result => alert("You chose " + result)}
            onChange={search => this.setState({ search })}
            label="Choose your simpson"
          />
        )}
      </Get>
    )
  }
}

;<Container />
```
