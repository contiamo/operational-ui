Card sections are flexibly stacked sub-containers designed to fit within cards. If specified, cards ignore other content-setting properties (`data`, `children`).

### Simple usage

```jsx
<div style={{ width: 300 }}>
  <Card
    sections={
      <>
        <CardSection title="Section 1">Content 1</CardSection>
        <CardSection title="Section 2">Content2</CardSection>
      </>
    }
  />
</div>
```

### Horizontal stacking

```jsx
<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection title="Section 1">Content 1</CardSection>
        <CardSection title="Section 2">Content 2</CardSection>
      </>
    }
  />
</div>
```

### Actions

```jsx
<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection title="Section 1" actions={["Action 1", "Action 2"]}>
          Content 1
        </CardSection>
      </>
    }
  />
</div>
```

### States

Card sections can assume a number of states indicating disabledness and drag-and-drop permissions.

```jsx
<div style={{ width: 300 }}>
  <Card
    stackSections="horizontal"
    sections={
      <>
        <CardSection title="Section 1" disabled>
          Content 1
        </CardSection>
        <CardSection title="Section 2">Content 2</CardSection>
      </>
    }
  />
</div>
```

### A drag-and-drop example

The following example shows how card sections can support a full-fledged drag-and-drop example. This example is quite verbose to implement the HTML5 drag-and-drop API, but beyond the logic, the different settings to toggle drag-and-drop feedback states are all represented.

```jsx
class DragAndDropExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /** Items in the drag source container */
      itemsInSource: ["Item 1", "Item 2", "Item 3"],
      /** Items in the drop target container */
      itemsInTarget: [],
      /** The item being dragged out of the above two arrays, if any */
      dragSource: undefined,
      /** The identifier of the current drop target, if any */
      dropTarget: undefined,
    }
  }

  render() {
    return (
      <div style={{ width: 600, height: 300, margin: 20 }}>
        <Card>
          <Tree
            trees={this.state.itemsInSource.map(item => ({
              label: item,
              draggable: true,
              onDragStart: ev => {
                this.setState(() => ({ dragSource: item }))
              },
              onDragEnd: ev => {
                this.setState(() => ({ dragSource: undefined }))
              },
              tag: "C",
              childNodes: [],
            }))}
          />
        </Card>
        <Card
          stackSections="horizontal"
          sections={
            <>
              {/* Drop target identified by "container1" */}
              <CardSection
                title="Container 1"
                onDragOver={ev => {
                  // Preventing default here so the `onDrop` event is fired.
                  ev.preventDefault()
                  /**
                   * This check is necessary to prevent blocking the render loop by piling up unnecessary `setState` calls
                   * when this element is already a drop target.
                   */
                  if (this.state.dropTarget === "container1") {
                    return
                  }
                  this.setState(() => ({ dropTarget: "container1" }))
                }}
                dragAndDropFeedback={
                  this.state.dragSource && (this.state.dropTarget === "container1" ? "dropping" : "validTarget")
                }
                onDragLeave={() => {
                  this.setState(() => ({ dropTarget: undefined }))
                }}
                onDrop={() => {
                  this.setState(prevState => ({
                    itemsInTarget: [...prevState.itemsInTarget, prevState.dragSource],
                    itemsInSource: prevState.itemsInSource.filter(item => item !== prevState.dragSource),
                    dragSource: undefined,
                    dropTarget: undefined,
                  }))
                }}
              >
                <Tree
                  trees={this.state.itemsInTarget.map(item => ({
                    label: item,
                    tag: "C",
                    childNodes: [],
                    onRemove: () => {
                      this.setState(prevState => ({
                        itemsInSource: [...prevState.itemsInSource, item],
                        itemsInTarget: prevState.itemsInTarget.filter(targetItem => targetItem !== item),
                      }))
                    },
                  }))}
                />
              </CardSection>
              {/* Drop target identified by "container2" */}
              <CardSection
                title="Container 2"
                onDragOver={() => {
                  // Preventing default here so the `onDrop` event is fired.
                  ev.preventDefault()
                  /**
                   * This check is necessary to prevent blocking the render loop by piling up unnecessary `setState` calls
                   * when this element is already a drop target.
                   */
                  if (this.state.dropTarget === "container2") {
                    return
                  }
                  this.setState(() => ({ dropTarget: "container2" }))
                }}
                dragAndDropFeedback={this.state.dragSource ? "invalidTarget" : undefined}
                onDragLeave={() => {
                  this.setState(() => ({ dropTarget: undefined }))
                }}
              />
            </>
          }
        />
      </div>
    )
  }
}
;<DragAndDropExample />
```
