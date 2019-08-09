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

  const hash = window.location.hash
  const [, currentCategory, currentComponent] = hash.split("/")

  const getPrevious = React.useCallback(() => {
    const currentCategoryIndex = items.findIndex(item => item.name === currentCategory)
    const currentComponentIndex = items[currentCategoryIndex].components.findIndex(
      item => item.name === currentComponent,
    )

    // If we're the first component, go to the previous category's last component
    if (currentComponentIndex === 0) {
      const previousCategoryIndex = currentCategoryIndex - 1 > 0 ? currentCategoryIndex - 1 : items.length - 1
      const lastComponentIndex = items[previousCategoryIndex].components.length - 1
      return `/#/${items[previousCategoryIndex].name}/${
        items[previousCategoryIndex].components[lastComponentIndex].name
      }`
    }

    // If we're not the first, go to the previous component in the current category
    if (currentComponentIndex > 0) {
      return `/#/${items[currentCategoryIndex].name}/${
        items[currentCategoryIndex].components[currentComponentIndex - 1].name
      }`
    }
  }, [window.location.href])

  const getNext = React.useCallback(() => {
    const currentCategoryIndex = items.findIndex(item => item.name === currentCategory)
    const currentComponentIndex = items[currentCategoryIndex].components.findIndex(
      item => item.name === currentComponent,
    )

    // If we're the last category, go to the first
    if (currentCategoryIndex === items.length - 1) {
      return `/#/${items[0].name}`
    }

    // If we're the last component in the category, go to the first component in the next
    if (currentComponentIndex === items[currentCategoryIndex].components.length - 1) {
      const nextCategoryIndex = currentCategoryIndex + 1 > items.length - 1 ? 0 : currentCategoryIndex + 1
      return `/#/${items[nextCategoryIndex].name}/${items[nextCategoryIndex].components[0].name}`
    }

    return `/#/${items[currentCategoryIndex].name}/${
      items[currentCategoryIndex].components[currentComponentIndex + 1].name
    }`
  }, [window.location.href])

  React.useEffect(() => {
    const handleArrow = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement.tagName)) {
        return
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        window.location.href = getPrevious()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        window.location.href = getNext()
      }
    }

    document.addEventListener("keydown", handleArrow)
    return () => document.removeEventListener("keydown", handleArrow)
  }, [window.location.href])

  return (
    <>
      {items.map(item => {
        const children = item.components.length > 0 ? item.components : item.sections

        return (
          <SidenavHeader active={true} label={item.name} key={item.name}>
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
