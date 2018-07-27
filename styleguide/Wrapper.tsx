import * as React from "react"
import OperationalUI from "../src/OperationalUI/OperationalUI"

const Wrapper: React.SFC = ({ children }) => <OperationalUI withBaseStyles>{children}</OperationalUI>

export default Wrapper
