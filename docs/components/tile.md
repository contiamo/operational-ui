# Tiles

Tiles are little pieces of information that contain a descriptor and a value of the descriptor. These elements are commonly used to represent KPI data, with strong key-value pairings.

## Usage

```js
<div>
  <Tile label="Use Cases" >Infinite</Tile>
  <Tile label="Potential">Unlimited</Tile>
  <Tile label="Cool Factor">
    > 10
  </Tile>
</div>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| label | What is the key in the key-value pairing? This is the description of the statistic itself. | string |  | No |
| color | See above. A stat can have its own background color. This can be a hex code, or a named color from your theme. | string | white | Yes |
| icon | React Feather icon name. See `Icon` component. | string |  | Yes |
| onAction | Method triggered when the top-right action icon is clicked. If not specified, the icon is not rendered at all. | function |  | Yes |
