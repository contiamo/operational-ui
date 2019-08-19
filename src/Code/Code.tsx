import { css } from "@emotion/core"
import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import Highlight from "react-highlight"
import ReactJson, { ReactJsonViewProps } from "react-json-view"

import { CopyIcon } from "../Icon"
import { DefaultProps } from "../types"
import constants from "../utils/constants"
import styled from "../utils/styled"
import { Languages } from "./languages"
import styles from "./styles"

export interface DefaultCodeProps extends DefaultProps {
  /** Language for syntax highlighting */
  syntax?: Exclude<Languages, "json">
  children: string
  copyable?: boolean
  onCopy?: () => void
}

interface JSONCodeProps extends DefaultProps {
  syntax: "json"
  children?: never
  src: ReactJsonViewProps["src"]
  collapsed?: ReactJsonViewProps["collapsed"]
  shouldCollapse?: ReactJsonViewProps["shouldCollapse"]
  codeTheme?: Partial<typeof defaultCodeTheme>
}

export type CodeProps = DefaultCodeProps | JSONCodeProps

const defaultCodeTheme = {
  /**
   * Default Background
   */
  base00: "rgba(20, 153, 206, 0.05)", // background color

  /**
   * Lighter Background (Used for status bars)
   */
  base01: "rgb(245, 245, 245)",

  /**
   * Selection Background
   */
  base02: "rgb(235, 235, 235)",

  /**
   * Comments, Invisibles, Line Highlighting
   */
  base03: "#93a1a1",

  /**
   * Descriptor (1 item, 2 items)
   */
  base04: "rgba(0, 0, 0, 0.3)",

  /**
   * Default Foreground, Caret, Delimiters, Operators
   */
  base05: "#586e75",

  /**
   * Light Foreground (Not often used)
   */
  base06: "#073642",

  /**
   * Keys and curlies
   */
  base07: "#002b36",

  /**
   * Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
   */
  base08: "#d33682",

  /**
   * Values:
   * `{ key: "value" }`
   */
  base09: "#cb4b16",

  /**
   * Classes, Markup Bold, Search Text Background
   */
  base0A: "#dc322f",

  /**
   * Strings, Inherited Class, Markup Code, Diff Inserted
   */
  base0B: "#859900",

  /**
   * Support, Regular Expressions, Escape Characters, Markup Quotes
   */
  base0C: "#6c71c4",

  /**
   * Functions, Methods, Attribute IDs, Headings
   */
  base0D: "#586e75",

  /**
   * Keywords, Storage, Selector, Markup Italic, Diff Changed
   */
  base0E: "#2aa198",

  /**
   * Opening/Closing Embedded Language Tags, e.g. <?php ?>
   */
  base0F: "#268bd2",
}

const Container = styled("div")`
  display: flex;
  position: relative;
  pre {
    flex: 1;
    display: flex;
    margin: 0;
    word-break: break-all;
    hyphens: auto;
    white-space: pre-wrap;
  }

  code {
    flex: 1;
  }

  /**
    * This is necessary because of odd arrow
    * placements inside the JSON viewer.
    */
  .icon-container > span {
    display: inline-flex;
  }

  /* Push things under it down a bit */
  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.element}px;
  }
`

const StyledHighlight = styled(Highlight)<{ className: CodeProps["syntax"] }>(({ theme }) => {
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

const StyledReactJson = (props: Pick<JSONCodeProps, "codeTheme" | "collapsed" | "src" | "shouldCollapse">) => (
  <ReactJson
    {...props}
    style={{
      margin: 0,
      border: "1px solid rgba(20, 153, 206, 0.1)",
      borderRadius: constants.borderRadius,
      padding: `${constants.space.small}px`,
      flex: 1,
    }}
    theme={{ ...defaultCodeTheme, ...props.codeTheme } || defaultCodeTheme}
    displayDataTypes={false}
    enableClipboard={true}
    name={false}
  />
)

const CodeIcon = styled(CopyIcon)`
  position: absolute;
  top: ${({ theme }) => theme.space.small}px;
  right: ${({ theme }) => theme.space.small}px;
  cursor: pointer;
`

const Code: React.SFC<CodeProps> = ({ children, ...props }) => {
  if (props.syntax === "json") {
    const { src, codeTheme, collapsed, shouldCollapse, ...jsonContainerProps } = props
    return (
      <Container {...jsonContainerProps}>
        <StyledReactJson codeTheme={codeTheme} src={src} collapsed={collapsed} shouldCollapse={shouldCollapse} />
      </Container>
    )
  }

  const { copyable, onCopy, ...containerProps } = props

  return (
    <Container {...containerProps}>
      {copyable && (
        <CopyToClipboard
          onCopy={onCopy}
          text={(children || "") as string /* type assertion because of React.SFC's broken children type */}
        >
          <CodeIcon size={22} color="color.text.lighter" />
        </CopyToClipboard>
      )}
      <StyledHighlight
        css={css`
          ${styles}
        `}
        className={props.syntax}
      >
        {children}
      </StyledHighlight>
    </Container>
  )
}

export default Code
