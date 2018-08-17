import * as React from "react"
import { render } from "react-dom"
import OperationalUI, { Card, CardSection, Tree, TreeProps } from "../src"

export interface State {
  labelsInSource: string[]
  labelsInTarget: string[]
  dragSource?: string
  dropTarget?: string
}

class DragAndDropExample extends React.Component<{}, State> {
  public state: State = {
    labelsInSource: ["123", "456", "789"],
    labelsInTarget: [],
  }

  public render() {
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
                      onRemove: () => {
                        this.setState(prevState => ({
                          labelsInTarget: prevState.labelsInTarget.filter(labelInTarget => labelInTarget !== label),
                          labelsInSource: [...prevState.labelsInSource, label],
                        }))
                      },
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

render(<DragAndDropExample />, document.getElementById("app"))
