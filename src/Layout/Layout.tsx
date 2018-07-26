import * as React from "react"
import { Progress } from "../"
import styled from "../utils/styled"

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
  // Positioned relative to display the absolutely positioned
  // loading bar element correctly.
  position: "relative",
})

/*
 * This is the main grid of the application, splitting up the viewport in 4 cells
 * (2 columns for the header, 2 for the content), on top of which the children are laid out.
 * On these children, row and column positions are set explicitly to prevent layout bugs
 * originating from child ordering and CSS properties set on the children.
 */
const GridContainer = styled("div")(
  {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  ({ theme }) => ({
    gridTemplateRows: `${theme.titleHeight}px auto`,
    gridTemplateColumns: `${theme.sidebarWidth}px auto`,
  }),
)

const Main = styled("div")(({ theme }) => ({
  overflow: "hidden",
  backgroundColor: theme.color.white,
  gridColumnStart: "2",
  gridColumnEnd: "span 1",
  gridRowStart: "2",
  gridRowEnd: "span 1",
}))

const Side = styled("div")({
  overflow: "hidden",
  gridColumnStart: "1",
  gridColumnEnd: "span 1",
  gridRowStart: "2",
  gridRowEnd: "span 1",
})

const Header = styled("div")({
  height: "100%",
  gridColumnStart: "1",
  gridColumnEnd: "span 2",
  gridRowStart: "1",
  gridRowEnd: "span 1",
})

const Layout = (props: Props) => (
  <Container>
    {props.loading && <Progress />}
    <GridContainer>
      <Header>{props.header}</Header>
      <Side>{props.sidenav}</Side>
      <Main>{props.main}</Main>
    </GridContainer>
  </Container>
)

export default Layout
