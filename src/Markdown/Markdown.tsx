import * as React from "react"
import ReactMarkdown from "react-markdown"

import Checkbox from "../Checkbox/Checkbox"
import Code, { DefaultCodeProps } from "../Code/Code"
import Table, { Column } from "../Table/Table"
import Body from "../Typography/Body"
import Title from "../Typography/Title"
import styled from "../utils/styled"

export interface MarkdownProps {
  value: string
}

export type TableNode = Array<React.ReactElement<{ children: TableNode; value: string }>>

const BulletPoint = styled("div")`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  margin-right: ${({ theme }) => theme.space.small}px;
`

const Markdown = ({ value: inputValue }: MarkdownProps) => {
  /**
   * react-markdown supports a concept of "renderers" that render
   * specific JSX for a given piece of Markdown AST.
   *
   * This is the dictionary that maps bits of Markdown to our
   * components.
   */
  const renderers = {
    code: ({ value, language }: { value: string; language: DefaultCodeProps["syntax"] }) => (
      <Code syntax={language}>{value}</Code>
    ),
    heading: ({ children }: JSX.ElementChildrenAttribute) => <Title>{children}</Title>,
    paragraph: ({ children }: JSX.ElementChildrenAttribute) => <Body>{children}</Body>,
    listItem: ({ children, checked }: { children: string; checked: boolean | null }) => (
      <Body style={{ display: "flex", alignItems: "center" }}>
        {checked === null && (
          <>
            <BulletPoint /> {children}
          </>
        )}
        {typeof checked === "boolean" && <Checkbox value={checked} label={children} />}
      </Body>
    ),

    /**
     * The structure of the table renderer in react-markdown
     * may be a little concerning: it gives you a full set of Table components in the
     * following shape:
     *
     * [
     *  { ...tableHead },
     *  { ...tableBody }
     * ]
     *
     * The schemas of these objects are react components with a predictable shape.
     * We've nailed down this version to be _exact_ in package.json so these will
     * not change, but as far as I can see, there is no better way to render tables
     * with this library.
     *
     * We looked at other libraries and also weren't able to find a clean-enough
     * solution. :(
     */
    table: ({ children: [tableHead, tableBody] }: { children: TableNode }) => {
      const columns = tableHead.props.children[0].props.children.map(
        columnNode => columnNode.props.children[0].props.value,
      )

      const data = tableBody.props.children.map(row =>
        row.props.children
          .map(child => child.props.children)
          .reduce((acc, child, index) => ({ ...acc, [columns[index] as string]: child[0].props.value }), {}),
      )

      return <Table columns={(columns as unknown) as Array<Column<{}>>} data={data} />
    },
  }

  return <ReactMarkdown renderers={renderers} source={inputValue} />
}

export default Markdown
