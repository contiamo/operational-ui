import * as React from "react"
import glamorous, { ThemeProvider } from "glamorous"
import ComponentPlayground from "component-playground"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import transformSnippet from "./transform-snippet"

interface IProps {
  snippet: string
  components?: { [id: string]: any }
  scope?: { [id: string]: any }
}

interface IState {
  isExpanded: boolean
}

const customGrey: string = "#cdcdcd"

const Container = glamorous.div(({ theme, isExpanded }: { theme: Theme; isExpanded: boolean }) => ({
  borderBottom: `3px solid ${customGrey}`,
  borderLeft: `3px solid ${customGrey}`,
  borderRight: `3px solid ${customGrey}`,

  ...isExpanded
    ? {
        border: 0,
        backgroundColor: theme.colors.palette.white,
        position: "fixed",
        top: 0,
        left: 60,
        width: "calc(100vw - 60px)",
        height: "100vh",
        zIndex: theme.baseZIndex + 1000,
        "& .playgroundStage": {
          height: "100%",
          "& > div": {
            height: "100%"
          }
        },
        "& > :first-child": {
          width: isExpanded ? "100%" : "calc(100% + 6px)",
          left: isExpanded ? 0 : -3
        }
      }
    : {},

  "& .playground": {
    display: "flex",
    width: "100%",
    height: isExpanded ? "calc(100% - 20px)" : "auto",
    maxWidth: isExpanded ? "none" : 850,
    maxHeight: isExpanded ? "none" : 400
  },

  "& .playgroundCode, & .playgroundPreview": {
    flex: "1 1 50%"
  },
  "& .playgroundPreview": {
    padding: theme.spacing * 4 / 3
  },
  "& .CodeMirror-wrap.CodeMirror": {
    minHeight: 320
  },
  "& .CodeMirror-code": {
    fontFamily: "monospace"
  },
  "& .CodeMirror-code pre": {
    fontSize: 13,
    lineHeight: 1.3
  }
}))

const ExpandPrompt = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.small,
  position: "relative",
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing / 4,
  cursor: "pointer",
  backgroundColor: customGrey,
  color: theme.colors.palette.white,
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: theme.colors.palette.info
  }
}))

class Playground extends React.Component<IProps, IState> {
  state: IState = {
    isExpanded: false
  }

  keypressHandler: (a: any) => void

  componentDidMount() {
    this.keypressHandler = (ev: any) => {
      if (ev.keyCode !== 27) {
        return
      }
      this.setState(prevState => ({
        ...prevState,
        isExpanded: false
      }))
    }
    window.addEventListener("keydown", this.keypressHandler)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keypressHandler)
  }

  render() {
    const { snippet, components, scope } = this.props
    const wrappedComponents: { [id: string]: any } = {}
    const comps = components || {}
    for (const key in comps) {
      wrappedComponents[key] = wrapTheme(contiamoTheme)(comps[key])
    }
    return (
      <Container isExpanded={this.state.isExpanded}>
        <ExpandPrompt
          onClick={(ev: any): void => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
          }}
        >
          {this.state.isExpanded ? "Collapse (Esc)" : "Give yourself some space - expand this playground"}
        </ExpandPrompt>
        <ComponentPlayground
          codeText={transformSnippet(snippet)}
          scope={{ React, ...wrappedComponents, ...(scope || {}) }}
        />
      </Container>
    )
  }
}

export default Playground
