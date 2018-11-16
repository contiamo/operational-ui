import * as React from "react"
import ReactMarkdown from "react-markdown"

import Checkbox from "../Checkbox/Checkbox"
import Code, { DefaultCodeProps } from "../Code/Code"
import Table from "../Table/Table"
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
  const renderers = {
    code: ({ value, language }: { value: string; language: DefaultCodeProps["syntax"] }) => (
      <Code syntax={language}>{value}</Code>
    ),
    heading: ({ children }: JSX.ElementChildrenAttribute) => <Title>{children}</Title>,
    paragraph: ({ children }: JSX.ElementChildrenAttribute) => <Body>{children}</Body>,
    listItem: ({ children, checked }: { children: string; checked: boolean }) => (
      <Body style={{ display: "flex", alignItems: "center" }}>
        {checked === null && (
          <>
            <BulletPoint /> {children}
          </>
        )}
        {typeof checked === "boolean" && <Checkbox value={checked} label={children} />}
      </Body>
    ),

    table: ({ children: [tableHead, tableBody] }: { children: TableNode }) => {
      const columns = tableHead.props.children[0].props.children.map(
        columnNode => columnNode.props.children[0].props.value,
      )

      const data = tableBody.props.children.map(row =>
        row.props.children
          .map(child => child.props.children)
          .reduce((acc, child, index) => ({ ...acc, [columns[index] as string]: child[0].props.value }), {}),
      )

      // `any` is used here because we don't know the structure of `data` from a Markdown string...
      return <Table columns={columns as any} data={data} />
    },
  }

  return <ReactMarkdown renderers={renderers} source={inputValue} />
}

export default Markdown
