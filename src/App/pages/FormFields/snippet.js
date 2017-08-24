export default {
  Input: `
<div>
  <Input
    css={{ marginBottom: 16 }}
    placeholder="Name here"
    name="forForms"
  />
</div>
`,

  Select: `
<div>
  {/* Uncomment the attributes to see them in action */}
  <Select
    //filterable
    multiple
    //disabled
    //onClick={() => window.alert('Hi!')}
    //onFilter={() => console.log('Filtering!')}
    placeholder="Choose an option!"
    options={[
      { id: 1, label: "Option 1", value: "one" },
      { id: 2, label: "Option 2", value: "two" },
      { id: 3, label: "Option 3", value: "three" }
    ]}
  />
</div>
`,

  Option: `
Option {
    id: 1, // a number that is passed as a \`key\` in the React iterator,
    label: "Any string",
    value: (<div>Literally anything can go here</div>)
}`
}
