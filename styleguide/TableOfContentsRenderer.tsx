import React from "react"
import { Input, Sidenav, styled } from "../src"

export interface TableOfContentsRendererProps {
  children: React.ReactElement<any>
  searchTerm: string
  onSearchTermChange: (newVal: string) => void
}

// Dont pass Input in RenderProps-(<SideNavHeader label={<Input/>} />) makes Compnent rerender and loses input focus
// Temporarily- manually configure like a SideNavHeader
// Another example why All presentational components should also be exported.

const Content = styled("div")(({ theme }) => ({
  textDecoration: "none",
  cursor: "pointer",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  height: 73,
  overflow: "hidden",
  padding: `0 ${theme.space.content}px`,
  width: "100%",
  marginBottom: 0,
}))

const Container = styled("div")(({ theme }) => ({
  label: "sidenavheader",
  textDecoration: "none",
  width: "100%",
  borderBottom: "1px solid",
  borderBottomColor: theme.color.separators.default,
}))

const TableOfContentsRenderer: React.SFC<TableOfContentsRendererProps> = ({
  children,
  searchTerm,
  onSearchTermChange,
}) => (
  <Sidenav>
    <Container>
      <Content>
        <Input
          fullWidth
          value={searchTerm}
          placeholder="Search Components..."
          aria-label="Search Components..."
          onChange={onSearchTermChange}
        />
      </Content>
    </Container>
    {children}
  </Sidenav>
)

export default TableOfContentsRenderer
