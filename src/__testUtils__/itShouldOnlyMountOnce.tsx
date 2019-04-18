import { mount } from "enzyme"
import * as React from "react"

class Child extends React.Component<{ mockFN: jest.Mock }> {
  public componentWillMount() {
    this.props.mockFN()
  }

  public render() {
    return <div />
  }
}

// tslint:disable-next-line: max-classes-per-file
class TestWrapper extends React.Component<{ comp: React.Factory<{ count: number }> }, { count: number }> {
  constructor(props: any) {
    super(props)
    this.state = { count: 1 }
  }

  public render() {
    return this.props.comp({ count: this.state.count })
  }
}

/// Component must allow children props

export const itShouldOnlyMountOnce = (
  componentName: string,
  Component: React.FunctionComponent<{ children: React.ReactNode }>,
) => {
  const mockFn = jest.fn()

  const Inner = ({ count }: any) => {
    return (
      <React.Fragment>
        <button>Count:{count}</button>
        <Component>
          <Child mockFN={mockFn} />
        </Component>
      </React.Fragment>
    )
  }

  it(`[${componentName}] should only mount once`, () => {
    const m = mount(<TestWrapper comp={Inner} />)
    /// Lets Update the state 4 Times
    m.setState({ count: 2 })
    m.setState({ count: 3 })
    m.setState({ count: 4 })
    m.setState({ count: 5 })

    /// Component should have only mounted once
    expect(mockFn).toBeCalledTimes(1)
  })
}
