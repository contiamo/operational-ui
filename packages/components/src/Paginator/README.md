Pagination is a predictable and expressive way to handle datasets that don't fit in a single view.  They are a straightforward alternative to infinite scrolling and lazy-loading interface elements, which take a long time to get cross-browser effective and accessible. This page describes how to use Operational UI's paginators.

### Usage

```jsx
class ComponentWithPaginator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  handleChange(page) {
    this.setState(() => ({ page }))
  }

  render() {
    return <Paginator pageCount={30} page={this.state.page} onChange={page => this.handleChange(page)} />
  }
}

<ComponentWithPaginator />
```
