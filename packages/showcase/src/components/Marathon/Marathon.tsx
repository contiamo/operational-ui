import * as React from "react"
import glamorous, { Div, Ul } from "glamorous"

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

interface IMarathon {
  test?: (a: IMarathon) => void
  expect?: (description: string, fn: TestFn) => void
  beforeEach?: (a: any) => void
  afterEach?: (a: any) => void
  beforeAll?: (a: any) => void
  afterAll?: (a: any) => void
  container?: HTMLElement
}

interface ITest {
  description: string
  fail: boolean
  fn: TestFn
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

class Marathon extends React.Component<IProps, IState> {
  static defaultProps = {
    timeout: 0
  }

  state = {
    tests: [] as ITest[],
    completed: 0
  }

  container: HTMLElement

  private _tests: ITest[] = []

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
    const test = tests[completed]

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
    this.setStateAsync(prevState => ({ tests })).then(() => {
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

const Content = glamorous.div(
  {
    padding: 20
  },
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.palette.grey10
  })
)

const Item = glamorous.li(
  {
    listStyle: "none",
    margin: 0,
    "&:before": {
      width: 16,
      height: 16,
      borderRadius: "50%",
      display: "inline-block"
    }
  },
  ({ theme, isCompleted, failed }: { theme: Theme; isCompleted?: boolean; failed?: boolean }) => {
    const { palette } = theme.colors
    return {
      "&:before": {
        content: isCompleted ? (failed ? "✘" : "✓") : "...",
        color: isCompleted ? (failed ? palette.error : palette.success) : palette.black
      }
    }
  }
)

interface IResultsProps {
  tests: ITest[]
  completed: number
}

const TestResults: React.SFC<IResultsProps> = ({ tests, completed }: IResultsProps) => (
  <Ul css={{ padding: 0 }}>
    {tests.map((test: any, index: any) => (
      <Item isCompleted={completed > index} failed={test.fail} key={index}>
        {test.description}
      </Item>
    ))}
  </Ul>
)

export default Marathon
