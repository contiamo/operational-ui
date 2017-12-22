import * as React from "react"
import { Route } from "react-router-dom"
import { Header } from "@operational/components"

export interface IBreadcrumb {
  label: string
  url: string
}

interface IProps {
  breadcrumbs?: IBreadcrumb[]
  note?: string
}

const AppHeader = (props: IProps) => (
  <Header
    css={{
      boxShadow: "0px 1px 2px #d3d1d1",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: "0 16px"
    }}
    color="#fff"
  >
    {props.breadcrumbs ? <div>a</div> : <div style={{ visibility: "hidden" }}>a</div>}
    {props.note ? props.note : null}
  </Header>
)

export default AppHeader
