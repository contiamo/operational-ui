# Context Menus

Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and in the upper right corner of cards.

## Usage

```js
<ContextMenu>
  <Icon name="MoreHorizontal" size={16} />
  <ContextMenuItem
    onClick={() => {
      console.log("clicked")
    }}
  >
    Menu 1
  </ContextMenuItem>
  <ContextMenuItem>Menu 2</ContextMenuItem>
  <ContextMenuItem>Menu 3</ContextMenuItem>
</ContextMenu>
```

## Props

### `<ContextMenu>`

| Name                | Description                                                                                       | Type       | Default | Required |
| :------------------ | :------------------------------------------------------------------------------------------------ | :--------- | :------ | :------- |
| open                | Specify whether the menu items are visible. Overrides internal open state that triggers on click. | boolean    | false   | Yes      |
| onClick             | Handles click events anywhere _inside_ the context menu container, including menu items.          | () => void |         | Yes      |
| onOutsideClick      | Handles click events anywhere _outside_ the context menu container, including menu items.         | () => void |         | Yes      |
| keepOpenOnItemClick | Suppresses the default behavior of closing the context menu when one of its items is clicked.     | boolean    | false   | Yes      |
| menuCss             | Styling overrides for the menu's container                                                        | object     | null    | Yes      |

## `<ContextMenuItem>`

| Name    | Description    | Type       | Default | Required |
| :------ | :------------- | :--------- | :------ | :------- |
| onClick | Click handler. | () => void | -       | Yes      |
