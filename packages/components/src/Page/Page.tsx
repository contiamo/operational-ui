import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Icon, IconName } from ".."
import PageArea from "../PageArea/PageArea"
import { CssStatic } from "../types"

export interface Props {
  /** Page title */
  title: string
  /** Icon displayed next to the title. Should match related sidenav icons */
  titleIcon?: IconName
  /** Page breadcrumbs, using the `Breadcrumbs` component */
  breadcrumbs?: React.ReactNode
  /** Page controls, typically `condensed button` component inside a fragment */
  controls?: React.ReactNode
  /** Content of the page */
  children?: React.ReactNode
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
}

const Container = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    label: "page",
    backgroundColor: theme.deprecated.colors.white,
    padding: `0px ${theme.deprecated.spacing * 1.5}px ${theme.deprecated.spacing * 1.5}px`,
  }),
)

const TopBar = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    height: theme.deprecated.box,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
)

const TitleBar = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    ...theme.deprecated.typography.title,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0.5 * theme.deprecated.spacing,
    marginBottom: 2 * theme.deprecated.spacing,
    "& svg": {
      width: theme.deprecated.spacing * 1.75,
      height: theme.deprecated.spacing * 1.75,
      marginRight: theme.deprecated.spacing * 0.5,
    },
  }),
)

const ControlsContainer = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    marginLeft: theme.deprecated.spacing,
    // Offset the line-height setting inherited from being inside a
    // typography component/mixin.
    lineHeight: 1,
    "& > :last-child": {
      marginRight: 0,
    },
  }),
)

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
    }
  },
)

const Page = (props: Props) => {
  const onlyOneChild = React.Children.count(props.children) === 1

  return (
    <Container>
      <TopBar>{props.breadcrumbs}</TopBar>
      <TitleBar>
        {props.titleIcon &&
          (props.titleIcon === String(props.titleIcon) ? <Icon name={props.titleIcon} /> : props.titleIcon)}
        {props.title}
        <ControlsContainer>{props.controls}</ControlsContainer>
      </TitleBar>
      <Grid fill={props.fill}>{onlyOneChild ? <PageArea>{props.children}</PageArea> : props.children}</Grid>
    </Container>
  )
}

export default Page
