import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { Progress } from "../"

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
)

const Main = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  display: "block",
  overflow: "auto",
  backgroundColor: theme.color.white,
}))

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
