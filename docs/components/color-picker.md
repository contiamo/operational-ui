# Color Pickers

Colors are an important part of any user interface. This calls for a reasonable control that allows a user to
choose a color from a canvas. Our component library exposes such a control, as seen below.

```js
class CompWithColorPicker extends React.Component {
  state = {
    color: "#123456"
  }

  handleColorChange = (color) => {
    this.setState(prevState => ({
      color
    }))
  }

  render() {
    return (
        <ColorPicker color={this.state.color} onChange={this.handleColorChange} />
    )
  }
}
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| color | The starting color of the component | string<hex> | blue | Yes |
| size | The size of the color picker. | number | 16 | Yes |
| onChange | A function that is called when the color changes. It is passed a color object as the first argument. | func | void | Yes |
