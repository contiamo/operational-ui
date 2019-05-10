## Basic Usage

```jsx
import { DataTable, DataTableSelect, ResourceName, Checkbox } from "@operational/components"
;<DataTable
  rows={[
    {
      isHeading: true,
      cells: [
        <ResourceName strong>Name</ResourceName>,
        <ResourceName strong>Age</ResourceName>,
        <ResourceName strong>Twitter</ResourceName>,
      ],
    },
    {
      isHeading: true,
      cells: [
        <DataTableSelect
          value="Lionel"
          options={[{ label: "Hello", value: "Lionel" }, { label: "I", value: "can" }]}
        />,
        <DataTableSelect
          value="Richie"
          options={[{ label: "Is it me", value: "Richie" }, { label: "see", value: "it" }]}
        />,
        <DataTableSelect value="Is" options={[{ label: "you're", value: "Is" }, { label: "in", value: "your" }]} />,
      ],
    },
    {
      isHeading: true,
      isDisabled: true,
      cells: [
        <>
          <Checkbox checked condensed /> is required
        </>,
        <>
          <Checkbox condensed /> is required
        </>,
        <>
          <Checkbox condensed /> is required
        </>,
      ],
    },
    {
      cells: [<ResourceName>Tejas Kumar</ResourceName>, 21, "@tejaskumar_"],
    },
    {
      cells: [<ResourceName>Imogen Mason</ResourceName>, 27, ""],
    },
    {
      cells: [<ResourceName>Fabien Bernard</ResourceName>, 30, "@fabien0102"],
    },
    {
      cells: [<ResourceName>Mykhailo Potomin</ResourceName>, 32, "@mpotomin"],
    },
    {
      cells: [<ResourceName>Stereo freaking BOOSTER</ResourceName>, -Infinity, "@stereobooster"],
    },
  ]}
/>
```

## With a height restriction

```jsx
import { Input, Select, ResourceName, Checkbox, styled } from "@operational/components"
const InsideInput = styled(Input)`
  margin: -12px -16px;
  height: 40px;
  border: 0;
`
const InsideSelect = styled(Select)`
  margin: -12px -16px;
  height: 40px;
  border: 0;
  width: 100%;
`
const MyComponent = () => {
  const [rows, setRows] = React.useState([
    {
      isHeading: true,
      cells: [<ResourceName strong>FirstName_IDN</ResourceName>, <InsideInput placeholder="Fill here" />],
    },
    {
      isHeading: true,
      cells: [
        <InsideSelect options={[{ label: "Text", value: "Text" }, { label: "Your mom" }]} value="Text" naked />,
        <InsideSelect fullWidth options={[{ label: "Text", value: "Text" }]} value="Text" naked />,
      ],
    },
    {
      isHeading: true,
      isDisabled: true,
      cells: [
        <>
          <Checkbox checked condensed /> is required
        </>,
        <>
          <Checkbox condensed /> is required
        </>,
      ],
    },
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
    ,
    {
      cells: ["", ""],
    },
  ])
  return (
    <DataTable
      height={100}
      editMode
      onAddClick={() => setRows(rows.map(row => ({ ...row, cells: [...row.cells, Math.random()] })))}
      rows={rows}
    />
  )
}
;<MyComponent />
```
