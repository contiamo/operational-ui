NameTags are small colored boxes containing the initials of an entity. They are simple ways to identify a resource across a product, such as a purple `PG` tag for a PostgreSQL database.

### Usage

By default, name tags are assigned a color from the Operational palette using a deterministic hash derived from the component's string content. Optionally, custom colors can be used.

```jsx
<>
  <NameTag left condensed color="success">
    M
  </NameTag>
  <NameTag left>TJ</NameTag>
  <NameTag left condensed color="primary">
    D
  </NameTag>
  <NameTag left>FB</NameTag>
  <NameTag condensed left color="#5e0074" assignColor={false}>
    S
  </NameTag>
  <NameTag color="primary" assignColor={false}>
    SV
  </NameTag>
</>
```
