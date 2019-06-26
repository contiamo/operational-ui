Top bar selects are context menu-like elements used exclusively inside `Topbar` elements. See [topbar docs](/#/Components/Topbar) for more usage examples.

```jsx
import * as React from "react"
import {
  BarChartIcon,
  CohortChartIcon,
  CounterIcon,
  LineGraphIcon,
  PieChartIcon,
  TableIcon,
  Topbar,
  TopbarSelect,
  WaterfallChartIcon,
} from "@operational/components"

const displayItems = [
  { label: "Table", icon: TableIcon },
  { label: "Bar Chart", icon: BarChartIcon },
  { label: "Line Chart", icon: LineGraphIcon },
  { label: "Counter", icon: CounterIcon },
  { label: "Pie Chart", icon: PieChartIcon },
  { label: "Cohort Chart", icon: CohortChartIcon },
  { label: "Waterfall Chart", icon: WaterfallChartIcon },
]

const icons = {
  Table: TableIcon,
  "Bar Chart": BarChartIcon,
  "Line Chart": LineGraphIcon,
  Counter: CounterIcon,
  "Pie Chart": PieChartIcon,
  "Cohort Chart": CohortChartIcon,
  "Waterfall Chart": WaterfallChartIcon,
}

const [activeFruit, setActiveFruit] = React.useState(undefined)
const [activeDisplay, setActiveDisplay] = React.useState("Table")

;<Topbar
  left={
    <TopbarSelect
      label="Fruit"
      selected={activeFruit}
      items={["apples", "oranges"].map(name => ({ label: name }))}
      onChange={item => setActiveFruit(item)}
    />
  }
  right={
    <TopbarSelect
      label="Display:"
      selected={activeDisplay}
      selectedIcon={icons[activeDisplay]}
      items={displayItems}
      onChange={item => setActiveDisplay(item)}
    />
  }
/>
```
