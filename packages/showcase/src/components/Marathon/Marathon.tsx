import * as React from "react"
import glamorous, { Div } from "glamorous"

import TestResults from "./Marathon.TestResults"

type TestFn = (done?: ((a: any) => void)) => void

interface IState {
  tests: ITest[]
  completed: number
}

interface IProps {
  css?: any
  className?: string
  timeout?: number
  test: (a: IMarathon) => void
  theme: Theme
}

export interface IMarathon {
  test?: (description: string, done?: () => void) => void
  expect?: (description: string, fn: TestFn) => void
  beforeEach?: (a: any) => void
  afterEach?: (a: any) => void
  beforeAll?: (a: any) => void
  afterAll?: (a: any) => void
  container?: HTMLElement
}

interface ITestWithRunner {
  description: string
  fail: boolean
  fn: TestFn
}

interface ITest {
  description: string
  fail: boolean
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const Content = glamorous.div(
  {
    padding: 20
  },
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.palette.grey10
  })
)

class Marathon extends React.Component<IProps, IState> {
  static defaultProps = {
    timeout: 0
  }

  state = {
    tests: [] as ITest[],
    completed: 0
  }

  container: HTMLElement

  private _tests: ITestWithRunner[] = []

  setStateAsync = (updater: (prevState: IState, props: IProps) => {}): Promise<void> =>
    new Promise(resolve => {
      this.setState(updater, () => {
        resolve()
      })
    })

  test = (description: string, fn: (done?: ((a: any) => void)) => void): void => {
    this._tests.push({ description, fn, fail: false })
  }

  expect = (condition: boolean): void => {
    if (!condition) {
      this.setState(({ tests, completed }: IState) => ({
        tests: tests.map((test, index) => (index === completed ? { ...test, fail: true } : test))
      }))
    }
  }

  runNext = async () => {
    const { tests, completed } = this.state
    const { timeout } = this.props
    const test = this._tests[completed]

    if (!test) {
      return
    }

    if (test.fn.length === 0) {
      await sleep(timeout)
      test.fn()
      await this.setStateAsync(prevState => ({ completed: prevState.completed + 1 }))
      this.runNext()
    } else {
      await sleep(timeout)
      test.fn(async () => {
        await this.setState(prevState => ({ completed: prevState.completed + 1 }))
        this.runNext()
      })
    }
  }

  componentDidMount() {
    const { test, _tests: tests, expect, container } = this

    // Run client-provided test function, injecting test methods (test, expect, ...)
    this.props.test({ test, expect, container } as any)

    // Pin the test array on state, run first one when ready.
    this.setStateAsync(prevState => ({
      tests: tests.map(test => ({ description: test.description, fail: test.fail }))
    })).then(() => {
      this.runNext()
    })
  }

  render() {
    const { css, className } = this.props
    return (
      <Div css={css} className={className}>
        <TestResults tests={this.state.tests} completed={this.state.completed} />
        <Content
          innerRef={(node: HTMLElement) => {
            this.container = node
          }}
        />
      </Div>
    )
  }
}

export default Marathon
