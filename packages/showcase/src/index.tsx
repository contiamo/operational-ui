import * as React from "react"
import * as ReactDOM from "react-dom"
import glamorous, { ThemeProvider } from "glamorous"

import App from "./App"

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<App />, document.querySelector("#app"))
  return true
}

render(App)
