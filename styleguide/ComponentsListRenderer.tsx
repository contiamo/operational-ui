import * as React from "react"

import { SidenavHeader, SidenavItem } from "../src"

export interface ComponentsListItem {
  filepath: string
  hasExamples: boolean
  slug: string
  name: string
  visibleName: string
}

export interface ParentItems {
  heading: boolean
  sectionDepth: number
  slug: string
  name: string
  visibleName: string
  description?: string
  href: string
  usageMode: "collapse" | "expanded"
  components: ComponentsListItem[]
}

export interface ComponentsListRendererProps {
  items: ParentItems[]
}

function ComponentsListRenderer({ items }: ComponentsListRendererProps) {
  return items.map(item => (
    <SidenavHeader active={true} label={item.name} key={item.name}>
      {item.components.map((component: any) => (
        <SidenavItem
          active={`/${window.location.hash}` === `${item.href}/${component.name}`}
          key={`${name}-${component.slug}`}
          label={component.name}
          to={`${item.href}/${component.name}`}
        />
      ))}
    </SidenavHeader>
  ))
}

export default ComponentsListRenderer
