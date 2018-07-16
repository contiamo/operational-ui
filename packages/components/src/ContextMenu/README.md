Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and in the upper right corner of cards.

### Usage

```jsx
const menuItems = ["Menu 1", "Menu 2", "Menu 3"]
;<ContextMenu items={menuItems} onClick={item => alert(`clicked ${item}`)}>
  <span>Click here</span>
</ContextMenu>
```

#### Condensed

```jsx
const menuItems = ["Menu 1", "Menu 2", "Menu 3"]
;<ContextMenu condensed items={menuItems} onClick={() => alert("clicked")}>
  <span>Click here</span>
</ContextMenu>
```

#### Styling based on open state

```jsx
const menuItems = ["Menu 1", "Menu 2", "Menu 3"]
;<ContextMenu condensed items={menuItems} onClick={() => alert("clicked")}>
  {(isOpen) => <span>{`I am ${isOpen ? "open" : "closed"}`}</span>}
</ContextMenu>
```
