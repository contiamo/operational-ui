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
}

// Test globals mimicking Jest's API
export interface IMarathon {
  test?: (description: string, done?: () => void) => void
  expect?: (expected: any) => { toBe: any }
  beforeEach?: (fn: any) => void
  afterEach?: (fn: any) => void
  beforeAll?: (fn: any) => void
  afterAll?: (fn: any) => void
  container?: HTMLElement
}

interface ITestWithRunner {
  description: string
  fn: TestFn
}

interface ITest {
  description: string
  errors: string[]
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
    this._tests.push({ description, fn })
  }

  expect = (actual: any): { toBe: any } => {
    return {
      toBe: (expected: any): void => {
        const error = actual === expected ? null : `Expected ${String(actual)} to equal ${String(expected)}`
        this.setState(({ tests, completed }: IState) => ({
          tests: tests.map((test, index) => (index === completed ? { ...test, errors: [...test.errors, error] } : test))
        }))
      }
    }
  }

  // Test lifecycle callbacks
  beforeEach?: () => void
  afterEach?: () => void
  beforeAll?: () => void
  afterAll?: () => void

  runNext = async () => {
    const { tests, completed } = this.state
    const { timeout } = this.props
    const test = this._tests[completed]

    if (!test) {
      this.afterAll && this.afterAll()
      return
    }

    if (test.fn.length === 0) {
      await sleep(timeout)
      try {
        this.beforeEach && this.beforeEach()
        test.fn()
        this.afterEach && this.afterEach()
      } catch (err) {
        await this.setStateAsync(prevState => ({
          tests: prevState.tests.map(
            (test, index) => (index === prevState.completed ? { ...test, errors: [...test.errors, String(err)] } : test)
          )
        }))
      }
      await this.setStateAsync(prevState => ({ completed: prevState.completed + 1 }))
      this.runNext()
    } else {
      await sleep(timeout)
      this.beforeEach && this.beforeEach()
      test.fn(async () => {
        this.afterEach && this.afterEach()
        await this.setState(prevState => ({ completed: prevState.completed + 1 }))
        this.runNext()
      })
    }
  }

  componentDidMount() {
    const { test, _tests: tests, expect, container } = this

    // Run client-provided test function, injecting test methods (test, expect, ...)
    this.props.test({
      test,
      expect,
      container,
      beforeEach: (fn: any): void => {
        this.beforeEach = fn
      },
      afterEach: (fn: any): void => {
        this.beforeEach = fn
      },
      beforeAll: (fn: any): void => {
        this.beforeAll = fn
      },
      afterAll: (fn: any): void => {
        this.afterAll = fn
      }
    } as any)

    // Pin the test array on state, run first one when ready.
    this.setStateAsync(prevState => ({
      tests: tests.map(test => ({ description: test.description, errors: [] }))
    })).then(() => {
      this.beforeAll && this.beforeAll()
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
