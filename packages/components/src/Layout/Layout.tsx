import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"
import { Progress } from "../"
import { Props as SidenavProps } from "../Sidenav/Sidenav"
import { sidenavExpandedWidth } from "../constants"

export interface Props {
  /** Side navigation, see `Sidenav` component */
  sidenav?: React.ReactNode
  /** Header content, see `Page` component */
  header?: React.ReactNode
  /** Main content, see `Page` component */
  main?: React.ReactNode
  /** Sets whether a loading progress bar should be rendered */
  loading?: boolean
}

const Content = styled("div")(
  {
    display: "grid",
    overflow: "auto",
  },
  ({ theme }: { theme?: OperationalStyleConstants }) => ({
    gridTemplateColumns: `${theme.sidebarWidth}px auto`,
  }),
)

const Main = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    display: "block",
    overflow: "auto",
    backgroundColor: theme.deprecated.colors.white,
  }),
)

const Container = styled("div")(
  {
    position: "relative",
    display: "grid",
    width: "100%",
    height: "100%",
  },
  ({ theme }: { theme?: OperationalStyleConstants }) => ({
    gridTemplateRows: `${theme.titleHeight}px auto`,
  }),
)

const Layout = (props: Props) => {
  return (
    <Container>
      {props.loading && <Progress />}
      {props.header}
      <Content>
        {props.sidenav}
        <Main>{props.main}</Main>
      </Content>
    </Container>
  )
}

export default Layout
