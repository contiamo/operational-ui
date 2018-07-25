import * as React from "react"
import { Input, Sidenav, SidenavHeader } from "../src"

const TableOfContentsRenderer: React.SFC<any> = ({ classes, children, searchTerm, onSearchTermChange }) => (
  <Sidenav>
    <SidenavHeader
      label={
        <Input
          fullWidth
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
