# Icons

Operational's SVG icon set as a single component. It abstracts over different types of icons ([Feather Icons](https://feathericons.com) and custom shapes) to provide a consistent API as the icon set evolves.

## Usage

```js
<div>
  <p>
    Here are some <a href="https://feathericons.com">Feather Icons</a>:
  </p>
  <Icon name="Play" size={36} />
  <Icon name="Pause" size={36} />
  <Icon name="Check" size={36} color="#00bb00" />
  <Icon name="X" size={36} color="error" />
  <p>And here some brand icons:</p>
  <Icon name="OperationalUI" size={36} />
  <Icon name="Labs" size={36} />
</div>
```

## Props

| Name  | Description                                                                                                                                                                                                | Type   | Default | Required |
| :---- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :------ | :------- |
| name  | Icon name. See https://feathericons.com (convert name to PascalCase) for feather icons. For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations` | string | Play    | No       |
| size  | Size as pre-defined strings.                                                                                                                                                                               | string | medium  | Yes      |
| color | Icon color, specified as a hex, or a color name (info, success, warning, error).                                                                                                                           | string | black   | Yes      |
