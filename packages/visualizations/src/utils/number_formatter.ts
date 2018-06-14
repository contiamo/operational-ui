import { flow } from "lodash/fp"
import { format } from "d3-format"

const defaultNumberFormatter: (x: number) => string = flow(
  format(".2f"),
  (val: string): number => +val,
  format(","),
)

export default defaultNumberFormatter
