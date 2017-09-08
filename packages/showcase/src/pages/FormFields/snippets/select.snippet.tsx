import * as React from "react"

import { Select } from "contiamo-ui-components"

export default
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
