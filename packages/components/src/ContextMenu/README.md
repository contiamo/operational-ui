Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and in the upper right corner of cards.

### Usage

```jsx
const { ContextMenuItem } = require("../")
;<ContextMenu>
  <span>Click here</span>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 1</ContextMenuItem>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 2</ContextMenuItem>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 3</ContextMenuItem>
</ContextMenu>
```

#### Condensed

```jsx
const { ContextMenuItem } = require("../")
;<ContextMenu condensed>
  <span>Click here</span>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 1</ContextMenuItem>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 2</ContextMenuItem>
  <ContextMenuItem onClick={() => alert("clicked")}>Menu 3</ContextMenuItem>
</ContextMenu>
```
