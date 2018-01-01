import { Header } from "@operational/components"
import routes from "./routes"

export default props => {
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
        <div style={{ visibility: "hidden" }}>a</div>
      }
      {props.note ? props.note : null}
    </Header>
  )
}
