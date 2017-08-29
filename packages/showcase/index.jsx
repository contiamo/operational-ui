import "react-hot-loader/patch"
import React from "react"
import ReactDOM from "react-dom"
import glamorous, { ThemeProvider } from "glamorous"
import { AppContainer } from "react-hot-loader"

import App from "./src/App"

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector("#app")
  )
}

render(App)

if (module.hot) {
  module.hot.accept("./src/App", () => {
    const NextAppContainer = require("./src/App")
    render(NextAppContainer)
  })
}
