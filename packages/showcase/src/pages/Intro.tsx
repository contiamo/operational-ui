import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Box, Grid, BarChart2 } from "react-feather"

import { Card as IntroCard } from "contiamo-ui-components"

const myCard = ({ className }: { className?: string }) =>
    <div className={className} style={{ padding: 32, maxWidth: 700 }}>
      <h1>Contiamo UI</h1>
      <h2>A single collection of UI components that compose to create Contiamo products.</h2>

      <div className="grid">
        <Link to="/components">
          <IntroCard className="card">
            <Box color="#777" size={30} />
            <h2>Components</h2>
          </IntroCard>
        </Link>
        <IntroCard className="card card_disabled">
          <Grid color="#777" size={30} />
          <h2>Composed</h2>
        </IntroCard>
        <Link to="/visualizations">
          <IntroCard className="card">
            <BarChart2 color="#777" size={30} />
            <h2>Visualizations</h2>
          </IntroCard>
        </Link>
      </div>
    </div>,
  style = () => ({
    "& .grid": {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: 16,
      marginTop: 32,
    },
    "& .card": {
      position: "relative",
      padding: "32px 16px",
      textAlign: "center",
      transition: ".3s transform ease",
      cursor: "pointer",
    },
    "& .grid a:link": {
      textDecoration: "none",
    },
    "& .card.card_disabled": {
      opacity: 0.6,
      pointerEvents: "none",
    },
    "& .card:hover": {
      transform: "translateY(-16px)",
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
      boxShadow: "0 8px 20px rgba(0, 0, 0, .14)",
    },
    "& .card:hover::after": {
      transition: ".3s opacity ease",
      opacity: 1,
    },
    "& .card h2": {
      marginBottom: 0,
      fontSize: 24,
      marginTop: 16,
      fontWeight: 300,
      color: "#777",
    },
  })

export default glamorous(myCard)(style)
