Pagination is a predictable and expressive way to handle datasets that don't fit in a single view. They are a straightforward alternative to infinite scrolling and lazy-loading interface elements, which take a long time to get cross-browser effective and accessible. This page describes how to use Operational UI's paginators.

### Usage

```jsx
initialState = {
  page: 1,
}
;<Paginator itemCount={258} itemsPerPage={50} page={state.page} onChange={page => setState({ page })} />
```
