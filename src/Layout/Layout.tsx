import * as React from "react"
import { Progress } from "../"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface LayoutProps extends DefaultProps {
  /** Side navigation, see `Sidenav` component */
  sidenav: React.ReactNode
  /** Header content, see `Page` component */
  header?: React.ReactNode
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
const GridContainer = styled("div")<{ hasHeader: boolean }>(
  {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  ({ theme, hasHeader }) => ({
    gridTemplateRows: hasHeader ? `${theme.titleHeight}px 100%` : "100%",
    gridTemplateColumns: `min-content`,
  }),
)

const Main = styled("div")<{ hasHeader: boolean }>(({ theme, hasHeader }) => ({
  overflow: "hidden",
  gridColumn: "2",
  height: hasHeader ? `calc(100% - ${theme.titleHeight}px)` : "100%", // FORCE a height that is the page - the logo so that children with 100% have context
  backgroundColor: theme.color.white,
}))

const Side = styled(Main)<{ hasHeader: boolean }>({
  gridColumn: "1",
})

const Header = styled("div")({
  height: "100%",
  gridColumn: 1,
  gridColumnEnd: "span 2",
  gridRow: 1,
})

const Layout: React.SFC<LayoutProps> = ({ loading, header, sidenav, main, ...props }) => (
  <Container {...props}>
    {loading && <Progress />}
    <GridContainer hasHeader={Boolean(header)}>
      {Boolean(header) && <Header>{header}</Header>}
      <Side hasHeader={Boolean(header)}>{sidenav}</Side>
      <Main hasHeader={Boolean(header)}>{main}</Main>
    </GridContainer>
  </Container>
)

export default Layout
