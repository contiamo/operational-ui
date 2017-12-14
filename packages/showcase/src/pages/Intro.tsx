import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Card, Icon, Heading2Type } from "@operational/components"
import { Theme } from "@operational/theme"

import PageContent from "../components/PageContent/PageContent"
import Demo from "../components/Demo/Demo"

const Grid = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: 16,
  marginTop: 20,
  "& a": {
    textDecoration: "none"
  }
}))

const LinkBox = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  padding: "32px 16px",
  textAlign: "center",
  transition: ".3s transform ease",
  cursor: "pointer",
  color: "#777",
  backgroundColor: "#fafafa",
  "&:hover": {
    backgroundColor: "#efefef"
  },
  "& h2": {
    ...theme.typography.title,
    color: "#777",
    marginBottom: 0,
    marginTop: 5
  }
}))

const TitleBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: `${theme.spacing * 1}px 0`,
  color: "#000",
  borderBottom: `1px solid ${theme.colors.contentSeparatorLine}`,
  "& > h1": {
    ...theme.typography.title,
    textAlign: "center",
    margin: 0
  },
  "& > h2": {
    ...theme.typography.body,
    textAlign: "center",
    marginTop: 0
  }
}))

const MyCard = ({ className }: { className?: string }) => (
  <PageContent>
    <Card css={{ width: "66%" }}>
      <TitleBar>
        <h1>Operational UI</h1>
        <h2>Building blocks for effective operational interfaces</h2>
      </TitleBar>

      <Grid>
        <Link to="/components">
          <LinkBox>
            <Icon name="Box" size={30} />
            <h2>Components</h2>
          </LinkBox>
        </Link>
        <Link to="/blocks">
          <LinkBox>
            <Icon name="Grid" size={30} />
            <h2>Blocks</h2>
          </LinkBox>
        </Link>
        <Link to="/visualizations">
          <LinkBox>
            <Icon name="BarChart2" size={30} />
            <h2>Visualizations</h2>
          </LinkBox>
        </Link>
        <Link to="/documentation">
          <LinkBox>
            <Icon name="Edit" size={30} />
            <h2>Documentation</h2>
          </LinkBox>
        </Link>
      </Grid>
    </Card>
    <Card css={{ width: "33%" }}>
      <Demo />
    </Card>
  </PageContent>
)

export default MyCard
