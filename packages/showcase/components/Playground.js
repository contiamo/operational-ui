import dynamic from "next/dynamic"
import glamorous, { ThemeProvider } from "glamorous"

import { wrapTheme } from "@operational/utils"
import { Theme, operational } from "@operational/theme"

const ComponentPlayground = dynamic(import("component-playground"), { ssr: false })

const customGrey: string = "#dadada"

const Container = glamorous.div(({ theme, isExpanded }) => ({
  border: `2px solid ${customGrey}`,

  ...isExpanded
    ? {
        border: 0,
        backgroundColor: theme.colors.white,
        position: "fixed",
        top: 0,
        left: 240,
        width: "calc(100vw - 240px)",
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
    height: isExpanded ? "calc(100% - 20px)" : "auto"
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
    fontFamily: "Menlo, Consolas, 'DejaVu Sans Mono', monospace"
  },
  "& .CodeMirror-code pre": {
    fontSize: 13,
    lineHeight: 1.3
  }
}))

const ExpandPrompt = glamorous.div(({ theme }) => ({
  ...theme.typography.small,
  position: "relative",
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing / 4,
  cursor: "pointer",
  backgroundColor: "#F8F8F8",
  color: "#8a8a8a",
  borderBottom: "1px solid #eaeaea",
  "&:hover": {
    backgroundColor: "#F1F1F1",
    color: "#7a7a7a"
  }
}))

class Playground extends React.Component {
  state = {
    isExpanded: false
  }

  keypressHandler = ev => {
    if (ev.keyCode !== 27) {
      return
    }
    this.setState(prevState => ({
      ...prevState,
      isExpanded: false
    }))
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keypressHandler)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keypressHandler)
  }

  render() {
    const { snippet, components, scope } = this.props
    const wrappedComponents = {}
    const comps = components || {}
    for (const key in comps) {
      wrappedComponents[key] = wrapTheme(operational)(comps[key])
    }
    return (
      <Container isExpanded={this.state.isExpanded}>
        <ExpandPrompt
          onClick={ev => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
          }}
        >
          {this.state.isExpanded ? "Collapse (Esc)" : "Give yourself some space - expand this playground"}
        </ExpandPrompt>
        <ComponentPlayground theme="mbo" codeText={snippet} scope={{ React, ...wrappedComponents, ...(scope || {}) }} />
      </Container>
    )
  }
}

export default Playground
