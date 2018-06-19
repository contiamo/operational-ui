import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Icon, IconName, Title } from ".."
import PageArea from "../PageArea/PageArea"
import { CssStatic } from "../types"

export interface Props {
  /** Page title */
  title: string
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
  /** Content of the page */
  children?: React.ReactNode
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
}

const Container = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  backgroundColor: theme.color.background.lighter,
}))

const TitleBar = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
  alignItems: "center",
}))

const Grid = styled("div")(
  (props: { children?: React.ReactNode; fill?: boolean; theme?: OperationalStyleConstants }) => {
    const grid = React.Children.count(props.children) > 1 ? "main side" : "main"

    return {
      display: "grid",
      gridTemplateColumns: grid.split(" ").length > 1 ? "auto 280px" : "auto",
      gridTemplateAreas: `"${grid}"`,
      gridGap: props.theme.space.content,
      maxWidth: props.fill ? "none" : 1150,
      minWidth: 800,
      width: "100%",
      padding: props.theme.space.element,
    }
  },
)

const Page = (props: Props) => {
  const onlyOneChild = React.Children.count(props.children) === 1

  return (
    <Container>
      {props.title && (
        <TitleBar>
          <Title color="white">{props.title}</Title>
          {props.actions}
        </TitleBar>
      )}
      <Grid fill={props.fill}>{onlyOneChild ? <PageArea>{props.children}</PageArea> : props.children}</Grid>
    </Container>
  )
}

export default Page
