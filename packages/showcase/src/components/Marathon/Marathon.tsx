import * as React from "react"
import glamorous, { Div } from "glamorous"

import TestResults from "./Marathon.TestResults"
import { Theme } from "contiamo-ui-components"

type TestFn = (done?: ((a: any) => void)) => void

interface IState {
  id: number // the id of the test, incrementing every time a new test prop is passed
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
    completed: 0,
    id: 0
  }

  container: HTMLElement

  private _tests: ITestWithRunner[] = []

  setStateById = (updater: (prevState: IState, props: IProps) => { id: number }, ignoreId?: boolean): Promise<void> => {
    // If the test id's don't match, it means that the setState is called from an uncleared timeout or async action from an old test.
    const tentativeNewState = updater(this.state, this.props)
    return new Promise((resolve, reject) => {
      if (!ignoreId && tentativeNewState.id !== this.state.id) {
        return reject()
      }
      this.setState(updater, () => {
        resolve()
      })
    })
  }

  test = (description: string, fn: (done?: ((a: any) => void)) => void): void => {
    this._tests.push({ description, fn })
  }

  expect = (actual: any): { toBe: any } => {
    return {
      toBe: (expected: any): void => {
        const error = actual === expected ? null : `Expected ${String(actual)} to equal ${String(expected)}`
        this.setStateById(({ id, tests, completed }: IState) => ({
          id,
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
      return
    }

    const currentTestId = this.state.id

    if (test.fn.length === 0) {
      await sleep(timeout)
      try {
        this.beforeEach && this.beforeEach()
        test.fn()
        this.afterEach && this.afterEach()
      } catch (err) {
        await this.setStateById(prevState => ({
          id: currentTestId,
          tests: prevState.tests.map(
            (test: ITest, index: number) =>
              index === prevState.completed ? { ...test, errors: [...test.errors, String(err)] } : test
          )
        }))
      }
      try {
        await this.setStateById((prevState: IState) => ({ id: currentTestId, completed: prevState.completed + 1 }))
        this.runNext()
      } catch (err) {}
    } else {
      await sleep(timeout)
      this.beforeEach && this.beforeEach()
      test.fn(async () => {
        this.afterEach && this.afterEach()
        try {
          await this.setStateById(prevState => ({ id: currentTestId, completed: prevState.completed + 1 }))
          this.runNext()
        } catch (err) {}
      })
    }
  }

  startTests() {
    const { test, expect, container } = this

    this._tests = []

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
    this.setStateById((prevState: IState) => ({
      id: prevState.id,
      tests: this._tests.map(test => ({ description: test.description, errors: [] }))
    })).then(() => {
      this.beforeAll && this.beforeAll()
      this.runNext()
    })
  }

  componentDidMount() {
    this.startTests()
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevProps.test !== this.props.test) {
      this.afterAll && this.afterAll()
      this.beforeEach = null
      this.afterEach = null
      this.beforeAll = null
      this.afterAll = null
      this.container.innerHTML = ""
      this.setStateById(
        prevState => ({
          id: prevState.id + 1,
          tests: [],
          completed: 0
          // Set ignoreId flag to true to proceed with the state update even though test ids don't match.
        }),
        true
      ).then(() => {
        this.startTests()
      })
    }
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
