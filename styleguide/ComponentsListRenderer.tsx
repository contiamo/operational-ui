import * as React from "react"

import { SidenavHeader, SidenavItem } from "../src"
import { StyleguideContext } from "./StyleguideContext"

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
  content?: any
  filepath?: string
  usageMode: "collapse" | "expanded"
  components: ComponentsListItem[]
  sections: ComponentsListItem[]
}

export interface ComponentsListRendererProps {
  items: ParentItems[]
}

const ComponentsListRenderer: React.FC<ComponentsListRendererProps> = ({ items }) => {
  const [_, dispatch] = React.useContext(StyleguideContext)

  return (
    <>
      {items.map(item => {
        const children = item.components.length > 0 ? item.components : item.sections
        const HeaderLink = children.length === 0 ? item.href : item.filepath ? item.href : undefined
        return (
          <SidenavHeader active={true} label={item.name} key={item.name} to={HeaderLink}>
            <span>
              {children.map((component: any) => (
                <SidenavItem
                  active={`/${window.location.hash}` === `${item.href}/${component.name}`}
                  key={`${name}-${component.slug}`}
                  label={component.name}
                  to={`${item.href}/${component.name}`}
                  onClick={() => {
                    dispatch({
                      type: "update iframe url",
                      url: `https://operational-ui.netlify.com/${item.href}/${component.name}`,
                    })
                  }}
                />
              ))}
            </span>
          </SidenavHeader>
        )
      })}
    </>
  )
}

export default ComponentsListRenderer
