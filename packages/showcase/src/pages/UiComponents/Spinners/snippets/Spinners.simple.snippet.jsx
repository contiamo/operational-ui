import * as React from "react"
import { Spinner } from "@operational/components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (() => {
  const styles = {
    display: "inline-block",
    margin: 20
  }

  return (
    <div>
      <Spinner css={styles} size={20} />
      <Spinner css={styles} color="#FF0021" spinDuration={4} />
      <Spinner css={styles} color="success" size={40} />
    </div>
  )
})()
