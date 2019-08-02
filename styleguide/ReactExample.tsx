import React, { Component } from "react"
import { languages } from "monaco-editor"
import compileCode from "react-styleguidist/lib/client/utils/compileCode"
import splitExampleCode from "react-styleguidist/lib/client/utils/splitExampleCode"
import ev from "react-styleguidist/lib/loaders/utils/client/evalInContext"
import Wrapper from "./Wrapper"
import { transpile } from "typescript"
import { styled } from "../src"

/* eslint-disable react/no-multi-comp */

const EvalContainer = styled("div")`
  border: 1px solid ${({ theme }) => theme.color.border.disabled};
  border-radius: 2px;
  padding: ${({ theme }) => theme.space.content}px;
  margin-bottom: ${({ theme }) => theme.space.element}px;
`

// Wrap the example component with a Functional Component to support
// hooks in examples
function FunctionComponentWrapper(props) {
  const { component, state, setState } = props

  // Return null when component doesn't render anything to avoid an error
  return component(state, setState) || null
}

// Wrap everything in a React component to leverage the state management
// of this component
class StateHolder<T> extends Component<{ initialState: T; component: React.ComponentType }, T> {
  state = this.props.initialState
  setStateBinded = this.setState.bind(this)

  render() {
    return (
      <FunctionComponentWrapper component={this.props.component} state={this.state} setState={this.setStateBinded} />
    )
  }
}

export default class ReactExample extends Component<{
  code: string
  evalInContext: typeof ev
  onError: () => void
  compilerConfig: any
}> {
  static contextTypes = {}

  shouldComponentUpdate(nextProps) {
    return this.props.code !== nextProps.code
  }

  // Eval the code to extract the value of the initial state
  getExampleInitialState(compiledCode) {
    if (compiledCode.indexOf("initialState") === -1) {
      return {}
    }

    return this.props.evalInContext(`
			var state = {}, initialState = {};
			try {
				${compiledCode};
			} catch (err) {}
			return initialState;
		`)()
  }

  // Run example code and return the last top-level expression
  getExampleComponent(compiledCode) {
    return this.props.evalInContext(`
			var initialState = {};
			${compiledCode}
		`)
  }

  render() {
    const { code, compilerConfig, onError } = this.props
    const compiledCode = compileCode(
      transpile(code, {
        target: languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        jsx: languages.typescript.JsxEmit.React,
        noEmit: true,
      }),
      compilerConfig,
      onError,
    )

    if (!compiledCode) {
      return null
    }

    const { head, example } = splitExampleCode(compiledCode)
    const initialState = this.getExampleInitialState(head)
    const exampleComponent = this.getExampleComponent(example)
    const wrappedComponent = (
      <Wrapper>
        <EvalContainer>
          <StateHolder component={exampleComponent} initialState={initialState} />
        </EvalContainer>
      </Wrapper>
    )
    return wrappedComponent
  }
}
