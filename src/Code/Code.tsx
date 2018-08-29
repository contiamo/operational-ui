import omit from "lodash/omit"
import * as React from "react"
import styled, { css } from "react-emotion"
import Highlight from "react-highlight"
import ReactJson, { ReactJsonViewProps } from "react-json-view"

import { DefaultProps } from "../types"
import constants from "../utils/constants"
import styles from "./styles"

function isJson(props: CodeProps): props is JSONCodeProps {
  return props.syntax === "json"
}

export interface DefaultCodeProps extends DefaultProps {
  /** Language for syntax highlighting */
  syntax?: string
  children?: string | string[]
}

interface JSONCodeProps extends DefaultProps {
  syntax: "json"
  children?: never
  src: ReactJsonViewProps["src"]
  collapsed?: ReactJsonViewProps["collapsed"]
  shouldCollapse?: ReactJsonViewProps["shouldCollapse"]
}

export type CodeProps = DefaultCodeProps | JSONCodeProps

const Container = styled("div")`
  display: flex;
  flex: 1;
  pre {
    flex: 1;
    display: flex;
    margin: 0;
  }

  code {
    flex: 1;
  }
`

const StyledHighlight = styled(Highlight)(({ theme }) => {
  return {
    margin: 0,
    border: "1px solid rgba(20, 153, 206, 0.1)",
    borderRadius: theme.borderRadius,
    padding: `${theme.space.small}px`,

    /**
     * We use !important here to handle an edge case:
     * this component, by default, gets a class .hljs
     * that also imports a global style for this class.
     *
     * Some bundlers (including Styleguidist's) place
     * this imported style _after_ our emotion-based
     * className definition, and the cascading nature
     * of CSS overrides this component's style.
     *
     * In short, we use !important for opinionation
     * of this component.
     */
    backgroundColor: "rgba(20, 153, 206, 0.05) !important",
  }
})

const StyledReactJson = (props: Pick<JSONCodeProps, "collapsed" | "src" | "shouldCollapse">) => (
  <ReactJson
    {...props}
    style={{
      margin: 0,
      border: "1px solid rgba(20, 153, 206, 0.1)",
      borderRadius: constants.borderRadius,
      padding: `${constants.space.small}px`,
      flex: 1,
    }}
    theme={{
      /** Base16 theme - http://chriskempson.com/projects/base16/ */
      base00: "rgba(20, 153, 206, 0.05)", // background color
      base01: "rgb(245, 245, 245)",
      base02: "rgb(235, 235, 235)",
      base03: "#93a1a1",
      base04: "rgba(0, 0, 0, 0.3)",
      base05: "#586e75",
      base06: "#073642",
      base07: "#002b36",
      base08: "#d33682",
      base09: "#cb4b16",
      base0A: "#dc322f",
      base0B: "#859900",
      base0C: "#6c71c4",
      base0D: "#586e75",
      base0E: "#2aa198",
      base0F: "#268bd2",
    }}
    displayDataTypes={false}
    enableClipboard={false}
  />
)

const Code: React.SFC<CodeProps> = ({ children, ...props }) => (
  <Container {...omit(props, ["src", "collapsed", "shouldCollapse", "syntax"])}>
    {isJson(props) ? (
      <StyledReactJson src={props.src} collapsed={props.collapsed} shouldCollapse={props.shouldCollapse} />
    ) : (
      <StyledHighlight className={`${css(styles)} ${props.syntax}`}>{children}</StyledHighlight>
    )}
  </Container>
)

export default Code
