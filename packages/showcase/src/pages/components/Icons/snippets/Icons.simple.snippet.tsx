import * as React from "react"
import { Icon } from "contiamo-ui-components"

export default (
  <div>
    <div>
      <p>
        Default size: <Icon name="Play" />
      </p>
    </div>
    <div>
      <p>
        Custom sizes:
        <Icon name="ChevronLeft" size={16} />
        <Icon name="AlertCircle" size={24} />
        <Icon name="Pause" size={18} />
      </p>
    </div>
  </div>
)
