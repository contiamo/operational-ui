import * as React from "react"
import { Grid } from "@operational/components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (() => {
  const TestContainer = props => (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 10
      }}
    >
      {props.children}
    </div>
  )

  return (
    <div style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Grid columns={["auto", "auto"]} rows={["auto", "auto"]} gap={20}>
        <TestContainer>One</TestContainer>
        <TestContainer>Two</TestContainer>
        <TestContainer>Three</TestContainer>
        <TestContainer>Four</TestContainer>
      </Grid>
    </div>
  )
})()
