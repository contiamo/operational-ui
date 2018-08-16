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

```jsx
class DragAndDropExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labelsInSource: ["123", "456", "789"],
      labelsInTarget: [],
    }
  }

  render() {
    return (
      <OperationalUI>
        <div style={{ width: 600, height: 300, margin: 20 }}>
          <Card>
            <Tree
              trees={this.state.labelsInSource.map(label => ({
                label,
                draggable: true,
                onDragStart: ev => {
                  this.setState({ dragSource: label })
                },
                onDragEnd: ev => {
                  this.setState({ dragSource: undefined })
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
                <CardSection
                  title="Title 1"
                  actions={["action1", "action2"]}
                  dragAndDropFeedback={
                    this.state.dragSource === undefined
                      ? undefined
                      : this.state.dropTarget === "1"
                        ? "dropping"
                        : "validTarget"
                  }
                  onDragOver={ev => {
                    ev.preventDefault()
                    this.setState({ dropTarget: "1" })
                  }}
                  onDragLeave={() => {
                    this.setState({ dropTarget: undefined })
                  }}
                  onDrop={() => {
                    this.setState(prevState => ({
                      labelsInTarget: [...prevState.labelsInTarget, prevState.dragSource],
                      labelsInSource: prevState.labelsInSource.filter(label => label !== prevState.dragSource),
                      dragSource: undefined,
                      dropTarget: undefined,
                    }))
                  }}
                >
                  <Tree
                    trees={this.state.labelsInTarget.map(label => ({
                      label,
                      tag: "C",
                      childNodes: [],
                    }))}
                  />
                </CardSection>
                <CardSection
                  title="Title 2"
                  dragAndDropFeedback={this.state.dragSource === undefined ? undefined : "invalidTarget"}
                  onDragOver={() => {
                    this.setState({ dropTarget: "2" })
                  }}
                  onDragLeave={() => {
                    this.setState({ dropTarget: undefined })
                  }}
                >
                  asdf
                </CardSection>
              </>
            }
          />
        </div>
      </OperationalUI>
    )
  }
}
;<DragAndDropExample />
```
