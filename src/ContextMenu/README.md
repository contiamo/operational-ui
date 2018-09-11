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
  {isOpen => <span>{`I am ${isOpen ? "open" : "closed"}`}</span>}
</ContextMenu>
```

#### Large number of items

The context menu doesn't grow past a certain maximum height, but scrolls in its container instead.

```jsx
const menuItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(item => `Menu ${item}`)
;<ContextMenu condensed items={menuItems} onClick={() => alert("clicked")}>
  Many options may be selected here
</ContextMenu>
```
