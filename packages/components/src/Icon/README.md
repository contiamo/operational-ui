Operational's SVG icon set packaged as a single component.

### Usage

```jsx
<>
  <Icon name="Add" size={36} />
  <Icon name="Function" size={36} />
  <Icon name="Funnel" size={36} color="#00bb00" />
  <p>And here some brand icons:</p>
  <Icon name="OperationalUI" size={36} />
  <Icon name="Pantheon" size={36} colored />
  <Icon name="Labs" size={36} />
</>
```

#### With margins for content

```jsx
<div style={{ display: "flex", alignItems: "center" }}>
  <Icon name="Add" left /> Play that song!
</div>
```

```jsx
<div style={{ display: "flex", alignItems: "center" }}>
  I'm on the right! <Icon name="Document" right />
</div>
```

### The Icon Set

```jsx
const icons = [
  "Add",
  "Admin",
  "Bundle",
  "Catalog",
  "Copy",
  "Database",
  "Deploy",
  "Document",
  "Endpoint",
  "Entity",
  "Function",
  "Funnel",
  "Home",
  "Jobs",
  "Lock",
  "No",
  "Olap",
  "Open",
  "Project",
  "Question",
  "Remove",
  "Schema",
  "Search",
  "SortAscending",
  "SortDescending",
  "User",
  "Users",
  "Yes",
]
;<div>
  {icons.map(icon => (
    <div style={{ display: "block", marginBottom: 10 }}>
      <Button color="primary" icon={icon}>
        {icon}
      </Button>
    </div>
  ))}
</div>
```
