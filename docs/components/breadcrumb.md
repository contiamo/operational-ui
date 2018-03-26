# Breadcrumbs

Breadcrumbs are typically a series of links showing the path to a particular page, and linking to each parent. Operational UI's breadcrumbs add a few extra functionality, such as icon and context menu support.

## Usage

```js
<Breadcrumbs>
  <a href="http://home.com"><Breadcrumb>Home</Breadcrumb></a>
  <Breadcrumb>Page 1</Breadcrumb>
  <Breadcrumb>Subpage 1</Breadcrumb>
</Breadcrumbs>
```

## Usage with context menu

```js
<Breadcrumbs>
  <ContextMenu css={{display: "inline-block", margin: 0}}>
    <Breadcrumb icon="ChevronDown">Hello</Breadcrumb>
    <ContextMenuItem>Item 1</ContextMenuItem>
    <ContextMenuItem>Item 2</ContextMenuItem>
    <ContextMenuItem>Item 3</ContextMenuItem>
  </ContextMenu>
  <Breadcrumb>Good Bye</Breadcrumb>
</Breadcrumbs>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| children | Child elements, typically <Breadcrumb> | ReactElement | null | Yes |
