import * as React from "react"
import glamorous from "glamorous"
import { Header, Breadcrumb, Breadcrumbs } from "@operational/components"
import { operational } from "@operational/theme"
import Link from "next/link"

export default props => {
  const pathnameChunks = props.pathname.split("/").filter(s => s !== "")
  const breadcrumbs = []
  const chunk1 = pathnameChunks[0]
  const chunk2 = pathnameChunks[1]
  if (chunk1) {
    breadcrumbs.push({
      url: `/${chunk1}`,
      label: props.pathmap[`/${chunk1}`].query.title
    })
  }
  if (chunk2) {
    breadcrumbs.push({
      url: `/${chunk1}/${chunk2}`,
      label: props.pathmap[`/${chunk1}/${chunk2}`].query.title
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
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => (
            <Breadcrumb key={index}>
              <Link key={index} href={breadcrumb.url}>
                <a>{breadcrumb.label}</a>
              </Link>
            </Breadcrumb>
          ))}
        </Breadcrumbs>
      }
      {props.note ? props.note : null}
    </Header>
  )
}
