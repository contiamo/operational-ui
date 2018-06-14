Typography components standardize heading and body font sizes across operational interfaces, and are used internally across component implementations.

Their recommended use:

- `<Title/>`: a single page title. If you are using `<Page/>`, it is rendered internally anyway.
- `<Heading1/>`: page headings.
- `<Heading2/>`: page subheadings when necessary. They should be used sparingly, preferring other organizational strategies like tabs or grids. If there is a lot of complexity to be organized, consider modals or adding the functionality to a separate page.
- `<Body/>`: ordinary body text.
- `<Small/>`: small text reserved for form labels and other secondary content. Consider combining them with an opacity or a lighter color.

### Usage

```js
const { Title, Heading1, Heading2, Body, Small } = require("./Typography")
;<>
  <Title>Title</Title>
  <Heading1>Heading1</Heading1>
  <Heading2>Heading2</Heading2>
  <Body>Body</Body>
  <Small>Small</Small>
</>
```
