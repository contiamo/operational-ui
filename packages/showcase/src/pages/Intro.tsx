import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"

import { Card, Icon, Heading2Type } from "contiamo-ui-components"
import { Theme } from "contiamo-ui-theme"

const Grid = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: 16,
  marginTop: 20,
  "& a:link": {
    textDecoration: "none"
  },
  "& .card": {
    position: "relative",
    padding: "32px 16px",
    textAlign: "center",
    transition: ".3s transform ease",
    cursor: "pointer"
  },
  "& .card.card_disabled": {
    opacity: 0.6,
    pointerEvents: "none"
  },
  "& .card:hover": {
    transform: "translateY(-5px)"
  },
  "& .card::after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    transition: ".3s opacity ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, .1)"
  },
  "& .card:hover::after": {
    transition: ".3s opacity ease",
    opacity: 1
  },
  "& .card h2": {
    ...theme.typography.title,
    marginBottom: 0,
    marginTop: 10,
    color: "#777"
  }
}))

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > h1": {
    ...theme.typography.title,
    margin: 0
  },
  "& > h2": {
    ...theme.typography.heading1,
    marginTop: 0
  },
  display: "block",
  padding: 32,
  maxWidth: 700
}))

const MyCard = ({ className }: { className?: string }) => (
  <Container className={className}>
    <h1>Contiamo UI</h1>
    <h2>Building blocks for effective operational interfaces</h2>

    <Grid>
      <Link to="/components">
        <Card className="card">
          <Icon name="Box" size={30} color="#777" />
          <h2>Components</h2>
        </Card>
      </Link>
      <Link to="/blocks">
        <Card className="card">
          <Icon name="Grid" size={30} color="#777" />
          <h2>Blocks</h2>
        </Card>
      </Link>
      <Link to="/visualizations">
        <Card className="card">
          <Icon name="BarChart2" size={30} color="#777" />
          <h2>Visualizations</h2>
        </Card>
      </Link>
      <Link to="/documentation">
        <Card className="card">
          <Icon name="Edit" size={30} color="#777" />
          <h2>Documentation</h2>
        </Card>
      </Link>
    </Grid>
  </Container>
)

export default MyCard
