import React, { useEffect, useRef } from "react"
import { Input, Sidenav, styled } from "../src"

export interface TableOfContentsRendererProps {
  children: React.ReactElement
  searchTerm: string
  onSearchTermChange: (newVal: string) => void
}

// Don't pass Input in RenderProps-(<SideNavHeader label={<Input/>} />) makes Component rerender and lose input focus
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
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement.tagName)) {
        return
      }
      if (e.key === "/" && inputRef.current) {
        e.preventDefault()
        inputRef.current.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Sidenav>
      <Container>
        <Content>
          <Input
            inputRef={inputRef}
            autoFocus
            fullWidth
            value={searchTerm}
            placeholder="Press / to search"
            aria-label="Search Components..."
            onChange={onSearchTermChange}
          />
        </Content>
      </Container>
      {children}
    </Sidenav>
  )
}

export default TableOfContentsRenderer
