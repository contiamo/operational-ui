import * as React from "react"
import OperationalUI from "../src/OperationalUI/OperationalUI"

const ThemeWrapper: React.SFC = ({ children }) => <OperationalUI withBaseStyles>{children}</OperationalUI>

export default ThemeWrapper
