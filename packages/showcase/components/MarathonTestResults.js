import * as React from "react"
import glamorous, { withTheme } from "glamorous"

import { Icon } from "@operational/components"
import { Theme } from "@operational/theme"

const Container = glamorous.ul({
  padding: 0
})

const Item = glamorous.li({
  listStyle: "none",
  margin: 0,
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: 2,
    marginBottom: 2
  }
})

const Title = glamorous.p(({ theme }) => ({
  ...theme.typography.heading1,
  display: "inline-block",
  "& :first-child": {
    position: "relative",
    top: -2,
    marginRight: 6
  },
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle"
  }
}))

const FailureMessage = glamorous.p(({ theme }) => ({
  color: theme.colors.error,
  display: "inline-block",
  marginLeft: 8,
  "&::before": {
    content: " → "
  }
}))

const TestResults = ({ tests, completed, theme }) => (
  <Container>
    {tests.map((test, index) => {
      const failed = test.errors.length > 0
      const isCompleted = completed > index
      const content = isCompleted ? (
        failed ? (
          <Icon name="X" size={12} color={theme.colors.error} />
        ) : (
          <Icon name="Check" size={12} color={theme.colors.success} />
        )
      ) : (
        <Icon name="MoreHorizontal" size={12} color={theme.colors.black} />
      )
      return (
        <Item key={index}>
          <Title>
            {content}
            {test.description}
          </Title>
          {failed && <FailureMessage>{test.errors.concat(" ")}</FailureMessage>}
        </Item>
      )
    })}
  </Container>
)

export default withTheme(TestResults)
