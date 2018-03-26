# Button

Buttons are used heavily throughout an operational interface, and they often require a fair amount of customization. They exist independently or in groups, and can shrink to a condensed mode if space is short. These buttons can also take on any number of colors required.

## Simple usage

Using buttons is as simple as including the component with a text node as a child. Colors may be specified as hex strings, or as a pre-defined color key from the theme.

```js
<div>
  <Button color="info">Button One</Button>
  <Button color="#393939">Button Two</Button>
  <Button disabled>Button Three</Button>
</div>
```

## Button groups

If used within the button group component, the library takes care to remove intermediate spacings, border radii and makes sure borders don't double up.

```js
<ButtonGroup>
  <Button>Group 1</Button>
  <Button active>Group 2</Button>
  <Button>Group 3</Button>
</ButtonGroup>
```

## Condensed mode

Buttons can be condensed, and further grouped to achieve, among other things, this paginator-style look:

```js
<ButtonGroup>
  <Button condensed>1</Button>
  <Button condensed color="success">2</Button>
  <Button condensed>3</Button>
</ButtonGroup>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| color | What color of button would you like? It can be a hex value or a named theme color. | string | white | Yes |
| onClick | What happens when the button is clicked? | func |  | Yes |
| active | Active state. | boolean |  | Yes |
| condensed | Condensed option | boolean |  | Yes |
| disabled | Disabled option | boolean |  | No |
