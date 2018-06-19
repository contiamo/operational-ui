Tooltips give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant and unobtrusive. Tooltips are great for UX, so we try to make them as versatile as possible.

### Usage

```jsx
<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <div style={{ position: "relative", border: "1px solid black", margin: 20, padding: 5, width: 80 }}>
    <p>I am a box full of mysteries.</p>
    <Tooltip>I uncover them all.</Tooltip>
  </div>
  <div style={{ position: "relative", border: "1px solid black", margin: 20, padding: 5, width: 80 }}>
    <p>I am a box full of mysteries.</p>
    <Tooltip bottom>I can be on bottom instead!</Tooltip>
    <Tooltip left>I can be on left instead!</Tooltip>
    <Tooltip right>I can be on right instead!</Tooltip>
  </div>
</div>
```
