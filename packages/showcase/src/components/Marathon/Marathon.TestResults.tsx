import * as React from "react"
import glamorous, { withTheme } from "glamorous"

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
    marginTop: 2,
    marginBottom: 2
  }
})

const Title = glamorous.p(({ theme }: { theme: Theme }): any => ({
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

const FailureMessage = glamorous.p(({ theme }: { theme: Theme }): any => ({
  color: theme.colors.palette.error,
  display: "inline-block",
  marginLeft: 8,
  "&::before": {
    content: " → "
  }
}))

interface IProps {
  tests: { description: string; failure?: string }[]
  completed: number
  theme: Theme
}

const TestResults: React.SFC<IProps> = ({ tests, completed, theme }: IProps) => (
  <Container>
    {tests.map((test: any, index: any) => {
      const failed = !!test.failure
      const isCompleted = completed > index
      const content = isCompleted ? (
        failed ? (
          <Icon name="X" size={12} color={theme.colors.palette.error} />
        ) : (
          <Icon name="Check" size={12} color={theme.colors.palette.success} />
        )
      ) : (
        <Icon name="MoreHorizontal" size={12} color={theme.colors.palette.black} />
      )
      return (
        <Item key={index}>
          <Title>
            {content}
            {test.description}
          </Title>
          {test.failure && <FailureMessage>{test.failure}</FailureMessage>}
        </Item>
      )
    })}
  </Container>
)

export default withTheme(TestResults)
