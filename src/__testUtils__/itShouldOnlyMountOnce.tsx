import React from "react"
import { cleanup, fireEvent, render } from "@testing-library/react"

interface ChildProps {
  cb: () => void
}

/**
 * This calls the passed callback on every `componentDidMount`
 * This is how we track if the parent un-mounts.
 *
 */
function Child({ cb }: ChildProps) {
  React.useEffect(() => {
    cb()
  }, [])

  return <div />
}

type WrapperProps = ChildProps & { Comp: React.FunctionComponent<any> }

/**
 * We use this to re-render its child on every state change
 */
const Wrapper = ({ cb, Comp }: WrapperProps) => {
  const [count, setCount] = React.useState(1)
  const handleClick = () => setCount(count + 1)

  return (
    <div>
      <button data-testid="triggerStateChange" onClick={handleClick}>
        Increase
      </button>
      <input data-testid="verifyStateChange" value={count} readOnly />
      <Comp>
        <Child cb={cb} />
      </Comp>
    </div>
  )
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
  afterEach(cleanup)
  it(`[${componentName}] should only mount once`, () => {
    const w = render(<Wrapper cb={mockFn} Comp={Component} />)
    // First Verify State Does Change
    expect((w.getByTestId("verifyStateChange") as HTMLInputElement).value).toEqual("1")
    fireEvent.click(w.getByTestId("triggerStateChange"))
    // Input should now be 2
    expect((w.getByTestId("verifyStateChange") as HTMLInputElement).value).toEqual("2")
    // Now check that mockFN was only called once
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
}
