Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and in the upper right corner of cards.

### Usage

```jsx
const { ContextMenuItem } = require("../")

;<ContextMenu>
  <span>Click here to trigger the context menu</span>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 1</ContextMenuItem>
  <ContextMenuItem>Menu 2</ContextMenuItem>
  <ContextMenuItem>Menu 3</ContextMenuItem>
</ContextMenu>
```
