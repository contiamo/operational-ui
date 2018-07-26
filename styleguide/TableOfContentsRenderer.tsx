import * as React from "react"
import { Input, Sidenav, SidenavHeader } from "../src"

export interface TableOfContentsRendererProps {
  children: React.ReactNode | React.ReactNode[]
  searchTerm: string
  onSearchTermChange: (newVal: string) => void
}

const TableOfContentsRenderer: React.SFC<TableOfContentsRendererProps> = ({
  children,
  searchTerm,
  onSearchTermChange,
}) => (
  <Sidenav>
    <SidenavHeader
      label={
        <Input
          fullWidth
          autoFocus
          value={searchTerm}
          placeholder="Search Components..."
          aria-label="Search Components..."
          onChange={onSearchTermChange}
        />
      }
    />
    {children}
  </Sidenav>
)

export default TableOfContentsRenderer
