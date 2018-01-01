import * as React from "react"
import glamorous, { Div } from "glamorous"

import TestResults from "./MarathonTestResults"

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const Content = glamorous.div({ padding: 20 }, ({ theme }) => ({
  backgroundColor: theme.colors.gray10
}))

class Marathon extends React.Component {
  static defaultProps = {
    timeout: 0
  }

  state = {
    tests: [],
    completed: 0,
    id: 0
  }

  _tests = []

  setStateById = (updater, ignoreId) => {
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

  test = (description, fn) => {
    this._tests.push({ description, fn })
  }

  expect = actual => {
    return {
      toBe: expected => {
        const error = actual === expected ? null : `Expected ${String(actual)} to equal ${String(expected)}`
        this.setStateById(({ id, tests, completed }) => ({
          id,
          tests: tests.map((test, index) => (index === completed ? { ...test, errors: [...test.errors, error] } : test))
        }))
      }
    }
  }

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
      beforeEach: fn => {
        this.beforeEach = fn
      },
      afterEach: fn => {
        this.beforeEach = fn
      },
      beforeAll: fn => {
        this.beforeAll = fn
      },
      afterAll: fn => {
        this.afterAll = fn
      }
    })

    // Pin the test array on state, run first one when ready.
    this.setStateById(prevState => ({
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

  componentDidUpdate(prevProps, prevState) {
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
          innerRef={node => {
            this.container = node
          }}
        />
      </Div>
    )
  }
}

export default Marathon
