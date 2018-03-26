# Breakdowns

Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about. The breakdown component itself belongs within the context of a larger container component that calculates numbers and supplies them to said component.

## Usage

```js
<div>
  <Breakdown number={1} label="50 (20%)" fill={0.2}>
    Stat 1
  </Breakdown>
  <Breakdown number={2} label="20 (40%)" fill={0.4}>
    Stat 2
  </Breakdown>
  <Breakdown number={3} label="40 (80%)" fill={0.8}>
    Stat 3
  </Breakdown>
</div>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| number | A number by which the breakdown is represented. | number | - | No |
| label | A statistic number label within the bar of the breakdown | string | - | No |
| fill | The percentage to fill the bar. This is typically passed in from a container component that calculates percentages at large. | number | - | No |
| color | A theme palette color name, or a hex code that the bar will be colored with. | string | *info* | Yes |
| icon | An icon that is displayed on the breakdown | string | - | Yes |
| onMouseEnter/onMouseLeave | Functions that are invoked when the mouse enters and/or leaves the breakdown. Useful for tooltips/infowindows | func | - | Yes |
