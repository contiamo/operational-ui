This component is a variant of `Input` that can be used with `DataTable`. See [DataTable](/#/Components/DataTable).

## Usage

We sometimes require editing data inside cells, for operational reasons. Here's how a `DataTableInput` composes together inside a [`DataTable`](#!/DataTable). The following `DataTableInput` also supports validation. It is programmed to only accept a `number`. Putting textual characters in there will trigger a validation error. Try it out!

```jsx
import { Title, DataTable, DataTableSelect, DataTableInput, DataTableFooter, Checkbox } from "@operational/components"

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

;<DataTable
  columns={[
    [
      "I am so long I am the longest the longest of the long LOL look how long I am my mom said I would never be long but I really am the longest KOBE BRYANT AINT GOT NOTHING ON ME HOMIE",
      <DataTableSelect
        options={[{ label: "Yes", value: "Yes" }, { label: "Other Dropdown Option", value: 1 }]}
        value="Yes"
      />,
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
  rows={[
    [String(Math.random()).repeat(1000), "Imogen Mason", "Good Stuff"],
    [String(Math.random()).repeat(1000), "Fabien Bernard", "🥖🥐🧀🍷"],
    [String(Math.random()).repeat(1000), "STEREO BOOSTER", "☕️"],
    [String(Math.random()).repeat(1000), "Mischa Potomin", "null"],
    [String(Math.random()).repeat(1000), "Tejas Kumar", "🍗🍖🥓🥩"],
  ]}
/>
```
