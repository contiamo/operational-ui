import * as React from "react"

import { SidenavHeader, SidenavItem } from "../src"
import { Consumer } from "./StyleGuideRenderer"

export interface ComponentsListItem {
  heading: string
  name: string
  components: ComponentsListItem[]
}

export interface ComponentsListRendererProps {
  items: ComponentsListItem[]
}

const ComponentsListRenderer: React.SFC<ComponentsListRendererProps> = ({ items }) => (
  <Consumer>
    {({ activeComponent }) =>
      items.map(({ name, components }) => (
        <SidenavHeader active={true} label={name} key={name}>
          {components.map(component => (
            <SidenavItem
              active={activeComponent === component.name}
              key={`${name}-${component.name}`}
              label={component.name}
              to={`#${component.name}`}
            />
          ))}
        </SidenavHeader>
      ))
    }
  </Consumer>
)

export default ComponentsListRenderer
