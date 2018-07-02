import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { Progress } from "../"

export interface Props {
  /** Side navigation, see `Sidenav` component */
  sidenav: React.ReactNode
  /** Header content, see `Page` component */
  header: React.ReactNode
  /** Main content, see `Page` component */
  main: React.ReactNode
  /** Sets whether a loading progress bar should be rendered */
  loading?: boolean
}

const Container = styled("div")({
  overflow: "hidden",
  height: "100%",
  position: "relative",
})

const Main = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  overflow: "auto",
  backgroundColor: theme.color.white,
}))

const Side = styled("div")({
  overflow: "auto",
})

const Content = styled("div")(
  {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "& > *:nth-child(1)": {
      gridColumnStart: "1",
      gridColumnEnd: "span 2",
      gridRowStart: "1",
      gridRowEnd: "span 1",
    },
    [Side as any]: {
      gridColumnStart: "1",
      gridColumnEnd: "span 1",
      gridRowStart: "2",
      gridRowEnd: "span 1",
    },
    [Main as any]: {
      gridColumnStart: "2",
      gridColumnEnd: "span 1",
      gridRowStart: "2",
      gridRowEnd: "span 1",
    },
  },
  ({ theme }: { theme?: OperationalStyleConstants }) => ({
    gridTemplateRows: `${theme.titleHeight}px 1fr`,
    gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
  }),
)

const Layout = (props: Props) => (
  <Container>
    {props.loading && <Progress />}
    <Content>
      {props.header}
      <Side>{props.sidenav}</Side>
      <Main>{props.main}</Main>
    </Content>
  </Container>
)

export default Layout
