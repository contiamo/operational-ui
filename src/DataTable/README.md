## Basic Usage

```jsx
import { Title, DataTable, DataTableSelect, DataTableFooter, Checkbox } from "@operational/components"
const newRows = [
  [Math.random(), Math.random(), Math.random()],
  [Math.random(), Math.random(), Math.random()],
  [Math.random(), Math.random(), Math.random()],
  [Math.random(), Math.random(), Math.random()],
  [Math.random(), Math.random(), Math.random()],
  [Math.random(), Math.random(), Math.random()],
  [Math.random(), Math.random(), Math.random()],
]

const MyComponent = () => {
  const [rows, setRows] = React.useState(newRows)

  return (
    <>
      <Title>Showing {Intl.NumberFormat().format(rows.length)} rows</Title>
      <DataTable
        height={200}
        columns={[
          ["Name", "Age", "Years of Employment"],
          [
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
            <DataTableSelect options={[{ label: "Yes", value: "Yes" }]} value="Yes" />,
          ],
          [
            <Checkbox condensed label="is required" />,
            <Checkbox condensed label="is required" />,
            <Checkbox condensed label="is required" />,
          ],
        ]}
        rows={rows}
        footer={
          <DataTableFooter
            onClick={() =>
              setRows([
                ...rows,
                ...newRows,
                ...rows,
                ...newRows,
                ...rows,
                ...newRows,
                ...rows,
                ...newRows,
                ...rows,
                ...newRows,
                ...rows,
                ...newRows,
              ])
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
