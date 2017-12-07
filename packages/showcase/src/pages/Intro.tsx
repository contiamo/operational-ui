import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Card, Icon, Heading2Type } from "@operational/components"
import { Theme } from "@operational/theme"

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
  backgroundColor: "#efefef",
  "&:hover": {
    backgroundColor: "#dedede"
  },
  "& h2": {
    ...theme.typography.title,
    marginBottom: 0,
    marginTop: 10,
    color: "#777"
  }
}))

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  height: "100%",
  "& > div": {
    height: `calc(100% - 2 * ${theme.spacing}px)`
  },
  "& > * > h1": {
    ...theme.typography.title,
    textAlign: "center",
    margin: 0
  },
  "& > * > h2": {
    ...theme.typography.heading1,
    textAlign: "center",
    marginTop: 0
  },
  display: "block",
  padding: theme.spacing * 1.5,
  maxWidth: 800
}))

const MyCard = ({ className }: { className?: string }) => (
  <Container className={className}>
    <Card>
      <h1>Operational UI</h1>
      <h2>Building blocks for effective operational interfaces</h2>

      <Grid>
        <Link to="/components">
          <LinkBox>
            <Icon name="Box" size={30} color="#777" />
            <h2>Components</h2>
          </LinkBox>
        </Link>
        <Link to="/blocks">
          <LinkBox>
            <Icon name="Grid" size={30} color="#777" />
            <h2>Blocks</h2>
          </LinkBox>
        </Link>
        <Link to="/visualizations">
          <LinkBox>
            <Icon name="BarChart2" size={30} color="#777" />
            <h2>Visualizations</h2>
          </LinkBox>
        </Link>
        <Link to="/documentation">
          <LinkBox>
            <Icon name="Edit" size={30} color="#777" />
            <h2>Documentation</h2>
          </LinkBox>
        </Link>
      </Grid>
    </Card>
  </Container>
)

export default MyCard
