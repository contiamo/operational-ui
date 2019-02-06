/**
 * This file is used as a simple standalone dev server for explorations that
 * don't necessarily make it into styleguidist sample code. They may be exploring
 * bugs, used to develop new features, and test combinations of components standalone
 * for production UI's.
 */
import * as React from "react"
import { render } from "react-dom"
import OperationalUI, { Card, CardSection, Tree, TreeProps } from "../src"

export interface State {
  courses: string[]
}

const remove = i => list => list.filter((_, j) => i !== j)

class Example extends React.Component<{}, State> {
  public readonly state: State = {
    courses: ["apples", "oranges", "grapefruit"],
  }

  public render() {
    return (
      <OperationalUI>
        <div style={{ width: 600, height: 300, margin: 20 }}>
          <Card>
            <Tree
              trees={this.state.courses.map(course => ({
                label: course,
                tag: "X",
                childNodes: [],
              }))}
              onReorder={(source, target) => {
                const sourceIndex = source[0]
                const targetIndex = target[0]

                let newCourses

                if (targetIndex === this.state.courses.length) {
                  newCourses = [...remove(sourceIndex)(this.state.courses), this.state.courses[sourceIndex]]
                } else {
                  newCourses = [...this.state.courses]
                  const swap = newCourses[sourceIndex]
                  newCourses[sourceIndex] = newCourses[targetIndex]
                  newCourses[targetIndex] = swap
                }

                this.setState(() => ({ courses: newCourses }))
              }}
            />
          </Card>
        </div>
      </OperationalUI>
    )
  }
}

render(<Example />, document.getElementById("app"))
