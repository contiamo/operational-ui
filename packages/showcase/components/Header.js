import * as React from "react"
import glamorous from "glamorous"
import { Header } from "@operational/components"
import { operational } from "@operational/theme"
import { routes } from "./routes"
import Link from "next/link"

const Breadcrumbs = glamorous.div(({ theme }) => ({
  "& a": {
    textDecoration: "none",
    color: "inherit",
    color: theme.colors.linkText,
    borderBottom: `1px solid ${theme.colors.linkText}`
  }
}))

const BreadcrumbsDivider = glamorous.span({
  display: "inline-block",
  margin: "0 6px"
})

export default props => {
  const pathnameChunks = props.pathname.split("/").filter(s => s !== "")
  const breadcrumbs = []
  const chunk1 = pathnameChunks[0]
  const chunk2 = pathnameChunks[1]
  let route
  if (chunk1) {
    route = routes.filter(r => r.url === "/" + chunk1)[0]
    breadcrumbs.push({
      url: chunk2 ? "/" + chunk1 : null,
      label: route.label
    })
  }
  if (chunk2) {
    breadcrumbs.push({
      url: null,
      label: route.items.filter(i => i.url === "/" + chunk2)[0].label
    })
  }
  return (
    <Header
      css={{
        boxShadow: "0px 1px 2px #d3d1d1",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "0 16px"
      }}
      color="#fff"
    >
      {
        /* Placeholder for breadcrumbs */
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => (
            <span>
              {breadcrumb.url ? (
                <Link key={index} href={breadcrumb.url}>
                  <a>{breadcrumb.label}</a>
                </Link>
              ) : (
                <strong>{breadcrumb.label}</strong>
              )}
              {index === breadcrumbs.length - 1 ? null : <BreadcrumbsDivider>/</BreadcrumbsDivider>}
            </span>
          ))}
        </Breadcrumbs>
      }
      {props.note ? props.note : null}
    </Header>
  )
}
