import * as React from "react"

export interface Props {
  timeout?: number
  onCompleted?: () => void
  test: (testEnvironment: MarathonEnvironment) => void
  children: (renderer: MarathonRenderer) => React.ReactNode
}

export interface State {
  // The id of the current running test, incrementing every time a new test prop is passed
  // this is necessary to intercept and abandon any asynchronous operations
  // within a test that has been swapped out.
  id: number
  // A test object that contains all `test(...)` definitions
  tests: Test[]
  completed: number
}

export interface MarathonRenderer {
  ref: (node: HTMLElement) => void
  results: { description: string; isCompleted: boolean; errors: string[] }[]
}

type TestFn = (done?: ((a: any) => void)) => void

// Methods available inside test definitions.
export interface MarathonEnvironment {
  test?: (description: string, done?: () => void) => void
  expect?: (expected: any) => { toBe: any }
  beforeEach?: (fn: any) => void
  afterEach?: (fn: any) => void
  beforeAll?: (fn: any) => void
  afterAll?: (fn: any) => void
  container: any
}

interface TestWithRunner {
  description: string
  fn: TestFn
}

export interface Test {
  description: string
  errors: string[]
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

class Marathon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  static defaultProps = {
    timeout: 2000,
  }

  state = {
    tests: [] as Test[],
    completed: 0,
    id: 0,
  }

  container: HTMLElement

  private _tests: TestWithRunner[] = []

  setStateById = (updater: (prevState: State, props: Props) => { id: number }, ignoreId?: boolean): Promise<void> => {
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
        this.setStateById(({ id, tests, completed }: State) => ({
          id,
          tests: tests.map(
            (test, index) => (index === completed ? { ...test, errors: [...test.errors, error] } : test),
          ),
        }))
      },
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

    const actualTimeout = completed === 0 ? 100 : timeout

    const currentTestId = this.state.id

    if (test.fn.length === 0) {
      await sleep(actualTimeout)
      try {
        this.beforeEach && this.beforeEach()
        test.fn()
        this.afterEach && this.afterEach()
      } catch (err) {
        await this.setStateById(prevState => ({
          id: currentTestId,
          tests: prevState.tests.map(
            (test: Test, index: number) =>
              index === prevState.completed ? { ...test, errors: [...test.errors, String(err)] } : test,
          ),
        }))
      }
      try {
        await this.setStateById((prevState: State) => ({ id: currentTestId, completed: prevState.completed + 1 }))
        this.runNext()
      } catch (err) {}
      return
    }
    await sleep(actualTimeout)
    this.beforeEach && this.beforeEach()
    test.fn(async () => {
      this.afterEach && this.afterEach()
      try {
        await this.setStateById(prevState => ({ id: currentTestId, completed: prevState.completed + 1 }))
        this.runNext()
      } catch (err) {}
    })
  }

  startTests() {
    this._tests = []

    // Run client-provided test function, injecting test methods (test, expect, ...)
    this.props.test({
      test: this.test,
      expect: this.expect,
      container: this.container,
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
      },
    } as any)

    // Pin the test array on state, run first one when ready.
    this.setStateById((prevState: State) => ({
      id: prevState.id,
      tests: this._tests.map(test => ({ description: test.description, errors: [] })),
    })).then(() => {
      this.beforeAll && this.beforeAll()
      this.runNext()
    })
  }

  componentDidMount() {
    this.startTests()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.test !== this.props.test) {
      this.afterAll && this.afterAll()
      this.beforeEach = undefined
      this.afterEach = undefined
      this.beforeAll = undefined
      this.afterAll = undefined
      this.container.innerHTML = ""
      this.setStateById(
        prevState => ({
          id: prevState.id + 1,
          tests: [],
          completed: 0,
          // Set ignoreId flag to true to proceed with the state update even though test ids don't match.
        }),
        true,
      ).then(() => {
        this.startTests()
      })
      return
    }
    if (this.state.completed === this.state.tests.length && this.state.completed !== 0 && this.props.onCompleted) {
      this.props.onCompleted()
    }
  }

  render() {
    return this.props.children({
      results: this.state.tests.map((test, index) => ({
        description: test.description,
        isCompleted: this.state.completed > index,
        errors: test.errors,
      })),
      ref: (node: HTMLElement) => {
        this.container = node
      },
    })
  }
}

export default Marathon
