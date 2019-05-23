## Basic Usage

```jsx
import { DataTable, DataTableSelect, DataTableInput, Checkbox } from "@operational/components"
;<DataTable
  height={225}
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
  ]}
/>
```

## Compact mode

```jsx
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

```jsx
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

## With an Input in cells

```jsx
import { Title, DataTable, DataTableSelect, DataTableInput, DataTableFooter, Checkbox } from "@operational/components"
const getNewRows = (lastIndex = 0) =>
  Array.from({ length: lastIndex > 1000000 ? 1 : (lastIndex || 1) * 10 }, (_, i) => [
    `Cell ${i + lastIndex + 1}`,
    Math.random(),
    Math.random(),
  ])

const Age = () => {
  const [age, setAge] = React.useState(new Date().getFullYear() - 1993)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    if (Number.isNaN(Number(age))) {
      setIsError(true)
      return
    }

    setIsError(false)
  }, [age])

  return (
    <DataTableInput
      error={isError ? "Only numbers please!" : undefined}
      placeholder="Age..."
      value={age}
      onChange={setAge}
    />
  )
}

const MyComponent = () => {
  const [rows, setRows] = React.useState(getNewRows())

  return (
    <>
      <Title>Showing {Intl.NumberFormat().format(rows.length)} rows</Title>
      <DataTable
        height={200}
        columns={[
          [
            "I am so long I am the longest the longest of the long LOL look how long I am my mom said I would never be long but I really am the longest KOBE BRYANT AINT GOT NOTHING ON ME HOMIE",
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <Checkbox condensed label="is required" />,
          ],
          [
            ,
            <Age />,
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <Checkbox condensed label="is required" />,
          ],
          [
            "Years of Employment",
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

```jsx
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
