```jsx
import * as React from "react"
import {
  DataTable,
  DataTableHeader,
  DataTableSelect,
  YesIcon,
  DataTableInput,
  Checkbox,
  Button,
  Title,
  styled,
} from "@operational/components"

const numColumns = 200
const numRows = 10e3

const columnName = index => {
  index += 1
  for (var ret = "", a = 1, b = 26; (index -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((index % b) / a) + 65) + ret
  }
  return ret
}

const cellContent = (column, row) => `${columnName(column)}-${row}`

const columns = []
const rows = []

for (var c = 0; c < numColumns; c++) {
  columns.push([columnName(c)])
}

for (var r = 0; r < numRows; r++) {
  const row = []
  for (var c = 0; c < numColumns; c++) {
    row.push(cellContent(c, r))
  }
  rows.push(row)
}

const MyComponent = () => {
  const [data, setData] = React.useState({ columns: [["one"]], rows: [["only"]] })

  return (
    <>
      <Title>
        Showing {Intl.NumberFormat().format(data.columns.length)} columns,{" "}
        {Intl.NumberFormat().format(data.rows.length)} rows
      </Title>
      {data.rows.length === 1 && (
        <Button color="primary" onClick={() => setData({ columns, rows })}>
          Display big data table
        </Button>
      )}
      <DataTable columns={data.columns} rows={data.rows} />
    </>
  )
}

;<MyComponent />
```

## Basic Usage

Our DataTable is used to render tabular data structures. For a basic use case, give it `rows` and `columns`.

- `columns` is an array (X) of arrays (Y), where X contains a column, and Y contains a stack of headers in each column.
- `rows` is an array (A) of arrays (B), where A is the entire row, and B is a single cell.

Supply a `height` prop to limit the height of the table.

Additionally, you can supply a component as a cell to customize the styling and functionality.

```jsx
import * as React from "react"
import {
  DataTable,
  DataTableHeader,
  DataTableSelect,
  YesIcon,
  DataTableInput,
  Checkbox,
  styled,
} from "@operational/components"

const CustomCell = styled.span`
  color: red;
`
;<DataTable
  columns={[
    [
      "I am so long I am the longest the longest of the long LOL look how long I am my mom said I would never be long but I really am the longest SHAQ AINT GOT NOTHING ON ME HOMIE",
    ],
    [
      <DataTableHeader
        title="Jithin Bas Choondapurrakkal"
        icon={YesIcon}
        actions={[{ label: "Say hi", onClick: () => alert("HIIII") }]}
      />,
    ],
    [
      <DataTableHeader
        title="Foooooooooooooood"
        icon={{ right: YesIcon }}
        actions={[{ label: "Say bye", onClick: () => alert("BYEEE <3") }]}
      />,
    ],
    ["Loves You"],
  ]}
  rows={[
    [String(Math.random()) + " whats up", "Imogen Mason", "Good Stuff", true],
    [String(Math.random()).repeat(1000), "Fabien Bernard", "🥖🥐🧀🍷", false],
    [String(Math.random()).repeat(1000), "STEREO BOOSTER", "☕️", true],
    [String(Math.random()).repeat(1000), <CustomCell>Mischa Potomin</CustomCell>, "null", false],
    [String(Math.random()).repeat(1000), "Tejas Kumar", "🍗🍖🥓🥩", true],
  ]}
/>
```

## Compact mode

Sometimes, we wish to render a _lot_ more data and have more of it visible. For this, we set `rowHeight="compact"` to enable compact mode.

```jsx
import * as React from "react"
import { DataTable, DataTableSelect, DataTableInput, Checkbox } from "@operational/components"
;<DataTable
  height={225}
  rowHeight="compact"
  columns={[
    [
      "I am so long I am the longest the longest of the long LOL look how long I am my mom said I would never be long but I really am the longest KOBE BRYANT AINT GOT NOTHING ON ME HOMIE",
    ],
    ["Name"],
    ["Diet"],
  ]}
  rows={[
    [String(Math.random()).repeat(1000), "Imogen Mason", "Good Stuff"],
    [String(Math.random()).repeat(1000), "Fabien Bernard", "🥖🥐🧀🍷"],
    [String(Math.random()).repeat(1000), "STEREO BOOSTER", "☕️"],
    [String(Math.random()).repeat(1000), "Mischa Potomin", "null"],
    [String(Math.random()).repeat(1000), "Tejas Kumar", "🍗🍖🥓🥩"],
    [String(Math.random()).repeat(1000), "Imogen Mason", "Good Stuff"],
    [String(Math.random()).repeat(1000), "Fabien Bernard", "🥖🥐🧀🍷"],
    [String(Math.random()).repeat(1000), "STEREO BOOSTER", "☕️"],
    [String(Math.random()).repeat(1000), "Mischa Potomin", "null"],
    [String(Math.random()).repeat(1000), "Tejas Kumar", "🍗🍖🥓🥩"],
    [String(Math.random()).repeat(1000), "Imogen Mason", "Good Stuff"],
    [String(Math.random()).repeat(1000), "Fabien Bernard", "🥖🥐🧀🍷"],
    [String(Math.random()).repeat(1000), "STEREO BOOSTER", "☕️"],
    [String(Math.random()).repeat(1000), "Mischa Potomin", "null"],
    [String(Math.random()).repeat(1000), "Tejas Kumar", "🍗🍖🥓🥩"],
  ]}
/>
```

## With cumulative data

The value of this component is that it uses a technique called **windowing** (or virtual scrolling). Click "Add more rows" in this example and add millions. It should (and does) scroll fast and smoothly, without hanging or crashing the browser.

This is made possible by [react-window](https://github.com/bvaughn/react-window) from [Brian Vaughn](https://twitter.com/brian_d_vaughn) on the [React](https://reactjs.org/) team. Thanks, Brian! 🎉

```jsx
import * as React from "react"
import { Title, DataTable, DataTableSelect, DataTableFooter, Checkbox } from "@operational/components"
const getNewRows = (lastIndex = 0) =>
  Array.from({ length: lastIndex > 1000000 ? 1 : (lastIndex || 1) * 10 }, (_, i) => [
    `Cell ${i + lastIndex + 1}`,
    Math.random(),
    Math.random(),
  ])

const MyComponent = () => {
  const [rows, setRows] = React.useState(getNewRows())

  return (
    <>
      <Title>Showing {Intl.NumberFormat().format(rows.length)} rows</Title>
      <DataTable
        className="hola-amigo"
        height={200}
        columns={[
          [
            "Folder",
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <Checkbox condensed label="is required" />,
          ],
          [
            "Size",
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <Checkbox condensed label="is required" />,
          ],
          [
            "Lolz",
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <Checkbox condensed label="is required" />,
          ],
        ]}
        rows={rows}
        footer={
          <DataTableFooter
            onClick={() =>
              setRows([...rows, ...getNewRows(parseInt(rows[rows.length - 1][0].replace("Cell ", ""), 10))])
            }
          >
            Add more rows
          </DataTableFooter>
        }
      />
    </>
  )
}

;<MyComponent />
```

## Dynamic Columns

When defining data sources in our product, we sometimes need to manually describe a schema. This is how `DataTable` allows us to model and define a schema.

```jsx
import * as React from "react"
import { Button, DataTable, DataTableSelect, Checkbox } from "@operational/components"

const columnsReducer = (columns, action) => {
  switch (action.type) {
    case "[add column]":
      return [...columns, action.column]
    case "[remove column]":
      return columns.filter(column => column[0] !== action.name)
    default:
      return columns
  }
}

const rowsReducer = (rows, action) => {
  switch (action.type) {
    case "[add column]":
      return rows.map(row => [...row, Math.random()])
    case "[remove column]":
      return rows.map(row => [...row.slice(0, row.length - 1)])
    default:
      return rows
  }
}

const MyComponent = () => {
  const [rows, rowsDispatch] = React.useReducer(rowsReducer, Array.from({ length: 100 }, () => ["hello"]))
  const [columns, columnsDispatch] = React.useReducer(columnsReducer, [["Tejas", "nothing"]])

  const makeColumn = React.useCallback(
    (name = Math.random()) => [
      name,
      <button
        onClick={() => {
          columnsDispatch({ type: "[remove column]", name })
          rowsDispatch({ type: "[remove column]" })
        }}
      >
        x
      </button>,
    ],
    [columns],
  )

  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          columnsDispatch({ type: "[add column]", column: makeColumn() })
          rowsDispatch({ type: "[add column]" })
        }}
      >
        Add Column
      </Button>
      <div style={{ marginTop: 32, width: "100%", overflowX: "auto" }}>
        {/* Use cellWidth to ensure cell sizes */}
        <DataTable cellWidth="200px" height={200} columns={columns} rows={rows} />
      </div>
    </>
  )
}

;<MyComponent />
```

## Text Overflow Protection

Sometimes, text overflows in ways that could be potentially ugly. The `DataTable` provisions for this, in case the content of a cell is longer than it's specified size by adding chevrons to indicate content overflow.

```jsx
import * as React from "react"
import { DataTable, DataTableSelect, DataTableInput, Checkbox } from "@operational/components"
;<DataTable
  columns={[
    [
      "I am so long I am the longest the longest of the long LOL look how long I am my mom said I would never be long but I really am the longest KOBE BRYANT AINT GOT NOTHING ON ME HOMIE",
    ],
    ["Name"],
    ["Lifestyle"],
    ["Resolution"],
    ["Name"],
    ["Lifestyle"],
    ["Resolution"],
    ["Name"],
    ["Lifestyle"],
    ["Resolution"],
    ["Name"],
    ["Lifestyle"],
    ["Resolution"],
  ]}
  rows={[
    [
      String(Math.random()).repeat(1000),
      "Imogen Mason",
      "I love my family",
      "To uphold British spelling ".repeat(1000),
      "Imogen Mason",
      "I love my family",
      "To uphold British spelling ".repeat(1000),
      "Imogen Mason",
      "I love my family",
      "To uphold British spelling ".repeat(1000),
      "Imogen Mason",
      "I love my family",
      "To uphold British spelling ".repeat(1000),
    ],
    [
      String(Math.random()).repeat(1000),
      "Fabien Bernard",
      "CLIMBING WINE TECH CNC FABLAB WOOO",
      "I promise to love wine ".repeat(1000),
      "Fabien Bernard",
      "CLIMBING WINE TECH CNC FABLAB WOOO",
      "I promise to love wine ".repeat(1000),
      "Fabien Bernard",
      "CLIMBING WINE TECH CNC FABLAB WOOO",
      "I promise to love wine ".repeat(1000),
      "Fabien Bernard",
      "CLIMBING WINE TECH CNC FABLAB WOOO",
      "I promise to love wine ".repeat(1000),
    ],
    [
      String(Math.random()).repeat(1000),
      "STEREO BOOSTER",
      "☕️",
      "I promise to boost stereos ".repeat(1000),
      "STEREO BOOSTER",
      "☕️",
      "I promise to boost stereos ".repeat(1000),
      "STEREO BOOSTER",
      "☕️",
      "I promise to boost stereos ".repeat(1000),
      "STEREO BOOSTER",
      "☕️",
      "I promise to boost stereos ".repeat(1000),
    ],
    [
      String(Math.random()).repeat(1000),
      "Mischa Potomin",
      "F I T N E S S",
      "I will always look my best ".repeat(2000),
      "Mischa Potomin",
      "F I T N E S S",
      "I will always look my best ".repeat(2000),
      "Mischa Potomin",
      "F I T N E S S",
      "I will always look my best ".repeat(2000),
      "Mischa Potomin",
      "F I T N E S S",
      "I will always look my best ".repeat(2000),
    ],
    [
      String(Math.random()).repeat(1000),
      "Tejas Kumar",
      "🍗🍖🥓🥩",
      "I will not complain about the backend team ".repeat(1000),
      "Tejas Kumar",
      "🍗🍖🥓🥩",
      "I will not complain about the backend team ".repeat(1000),
      "Tejas Kumar",
      "🍗🍖🥓🥩",
      "I will not complain about the backend team ".repeat(1000),
      "Tejas Kumar",
      "🍗🍖🥓🥩",
      "I will not complain about the backend team ".repeat(1000),
    ],
  ]}
/>
```
