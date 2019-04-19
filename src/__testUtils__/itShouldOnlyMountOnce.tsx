import { mount } from "enzyme"
import * as React from "react"

/**
 * This calls the passed function on every `componentDidMount`
 * This is how we track is the parent un-mounts.
 * We can use hooks here because were cool.
 *
 */

function Child({ mockFN }: { mockFN: jest.Mock }) {
  React.useEffect(() => {
    mockFN()
  }, [])

  return <div />
}

/**
 * Must be a class in order to update state with enzyme.
 * We use this to re-render its child on every state change
 */
class TestWrapper extends React.Component<{ comp: React.FunctionComponent<{ count: number }> }, { count: number }> {
  public state = {
    count: 1,
  }

  public render() {
    return this.props.comp({ count: this.state.count })
  }
}

/**
 * A test hack to checks if a component does not re-mount on every render
 * Need this since we dont have access to life-cycle methods of the component we want to check,
 * we pass a child with a tracker because if the parent node un-mounts, all its children un-mount.
 *
 * Therefore, **we can only use this test for components that accept any children**.
 *
 *  ![TestHack](https://media1.tenor.com/images/7da78fe87cf5a457fbec3406e82d6cb3/tenor.gif)
 */
export const itShouldOnlyMountOnce = (componentName: string, Component: React.FunctionComponent<any>) => {
  const mockFn = jest.fn()

  const Inner = ({ count }: { count: number }) => {
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
