import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Box, Grid, BarChart2 } from "react-feather"

import { Card, Icon } from "contiamo-ui-components"

const style = () => ({
  "& .grid": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: 16,
    marginTop: 32
  },
  "& .card": {
    position: "relative",
    padding: "32px 16px",
    textAlign: "center",
    transition: ".3s transform ease",
    cursor: "pointer"
  },
  "& .grid a:link": {
    textDecoration: "none"
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
    marginBottom: 0,
    fontSize: 24,
    marginTop: 16,
    fontWeight: 300,
    color: "#777"
  }
})

const myCard = ({ className }: { className?: string }) => (
  <div className={className} style={{ display: "block", padding: 32, maxWidth: 700 }}>
    <h1>Contiamo UI</h1>
    <h2>Building blocks for effective operational interfaces</h2>

    <div className="grid">
      <Link to="/styleguide">
        <Card className="card">
          <Icon name="Edit" size={30} color="#777" />
          <h2>Style guide</h2>
        </Card>
      </Link>
      <Link to="/components">
        <Card className="card">
          <Icon name="Box" size={30} color="#777" />
          <h2>Components</h2>
        </Card>
      </Link>
      <Card className="card card_disabled">
        <Icon name="Grid" size={30} color="#777" />
        <h2>Composed</h2>
      </Card>
      <Link to="/visualizations">
        <Card className="card">
          <Icon name="BarChart2" size={30} color="#777" />
          <h2>Visualizations</h2>
        </Card>
      </Link>
    </div>
  </div>
)

export default glamorous(myCard)(style)
