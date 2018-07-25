import * as React from "react"
import { SidenavHeader, SidenavItem } from "../src"

const ComponentsListRenderer: React.SFC<any> = ({ classes, items }) => (
  <SidenavHeader active={true} label="Components">
    {items.map(({ heading, name, href, content }: any) => <SidenavItem key={href} label={name} to={href} />)}
  </SidenavHeader>
)

export default ComponentsListRenderer
