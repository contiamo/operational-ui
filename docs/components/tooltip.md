# Tooltips

Tooltips give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant and unobtrusive. Tooltips are great for UX, so we try to make them as versatile as possible.

## Usage

```js
<div>
  <div style={{position: "relative", width: 80, height: 80, border: "1px solid black"}}>
    <p>I am a box full of mysteries.</p>
    <Tooltip>I uncover them all.</Tooltip>
  </div>
  <div style={{position: "relative", width: 80, height: 80, border: "1px solid black"}}>
    <p>I am a box full of mysteries.</p>
    <Tooltip bottom>I can be here instead!</Tooltip>
  </div>
</div>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| top | Top-positioned tooltip | boolean | - | Yes |
| bottom | Top-positioned tooltip | boolean | - | Yes |
| left | Left-positioned tooltip | boolean | - | Yes |
| right | Right-positioned tooltip | boolean | - | Yes |
| smart | Smart-positioned tooltip, with positioning reversed so it doesn't flow out of the window's bounding box. Currently works for left and top-positioned tooltips. | boolean | - | Yes |
