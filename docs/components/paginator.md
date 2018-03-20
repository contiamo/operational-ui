# Paginators

Pagination is a predictable and expressive way to handle datasets that don't fit in a single view.  They are a straightforward alternative to infinite scrolling and lazy-loading interface elements, which take a long time to get cross-browser effective and accessible. This page describes how to use Operational UI's paginators.

## Usage

```js
class ComponentWithPaginator extends React.Component {
  state = {
    page: 1
  }

  handleChange(page) {
    this.setState(() => ({ page }))
  }

  render() {
    return <Paginator pageCount={30} page={this.state.page} onChange={page => this.handleChange(page)} />
  }
}
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| pageCount | Total number of pages. | number | null | No |
| maxVisible | Maximum amount of pages to be displayed. | number | 3 | Yes |
| page | Index of the current selected page | number | 1 | Yes |
| onChange | Function to be executed after changing page. Receives a single argument which represents the new page number | function | void | Yes |
