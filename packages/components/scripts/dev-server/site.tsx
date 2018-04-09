import * as React from "react"
import glamorous, { Div } from "glamorous"
import { operational, Theme } from "@operational/theme"
import { render } from "react-dom"
import { lighten } from "@operational/utils"
import Showcase from "./Showcase"

render(<Showcase />, document.getElementById("app"))
