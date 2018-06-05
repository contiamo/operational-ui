import * as React from "react"
import { render } from "react-dom"
import { OperationalUI, Header } from "../../src/"

const Logo = () => "Contiamo"

const ProjectSelector = ({ projects }: any) => <div>hi</div>

const UserMenu = () => <div>lmao</div>

const App = () => (
  <OperationalUI withBaseStyles>
    <Header start={Logo} middle={props => <ProjectSelector projects={props.projects} />} end={UserMenu} />
  </OperationalUI>
)

render(<App />, document.querySelector("#app"))
