import * as React from "react"
import glamorous from "glamorous"

import { Icon } from "contiamo-ui-components"

const Container = glamorous.ul({
  padding: 0
})

const Item = glamorous.li({
  listStyle: "none",
  margin: 0,
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
    margin: "4px auto"
  },
  "& :first-child": {
    marginRight: 6
  }
})

interface IProps {
  tests: { description: string; fail: boolean }[]
  completed: number
}

const TestResults: React.SFC<IProps> = ({ tests, completed }: IProps) => (
  <Container>
    {tests.map((test: any, index: any) => {
      const failed = test.fail
      const isCompleted = completed > index
      const content = isCompleted ? (
        failed ? (
          <Icon name="X" size={12} color="#FF0000" />
        ) : (
          <Icon name="Check" size={12} color="#00FF00" />
        )
      ) : (
        <Icon name="MoreHorizontal" size={12} color="#000000" />
      )
      return (
        <Item key={index}>
          {content}
          {test.description}
        </Item>
      )
    })}
  </Container>
)

export default TestResults
