Card items are useful for displaying information about a resource in a key-value structure that is consistently formatted inside a container (typically a `Card`).

### Usage

Values are rendered in a pre-defined size, with a monospace font option for technical data like ID's or names that also show up in code or logs.

```jsx
<Card title="My Bundle">
  <CardItem title="Bundle name" value="MyBundleVersion3" monospace />
  <CardItem title="Deployed" value="Last friday" />
  <CardItem title="Updated" value="Last monday" />
</Card>
```
