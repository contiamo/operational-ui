// @flow
import React from 'react'

import Playground from 'component-playground'

import Table from '../../components/PropsTable/PropsTable'
import DemoChip from '../../../components/Chip/Chip'
import DemoPlusChip from '../../../components/PlusChip/PlusChip'

import snippet from './snippet'
import propDescription from './propDescription'

export default () =>
  (<div>
    <h1>Chips</h1>

    <h2>
      Most commonly used for filters, these elements represent small bits of information that give a
      sense of context to the user.
    </h2>

    <p>
      Chips can be interactive, or simply informative. They can take on any color passed through
      `props`, along with a symbol for the button that will be displayed if click behavior is
      detected.
    </p>

    <div style={{ display: 'flex' }}>
      <DemoChip css={{ marginBottom: 16 }}>Chip 1</DemoChip>
      <DemoChip css={{ marginBottom: 16 }}>Chip 2</DemoChip>
    </div>

    <h2>Usage</h2>
    <Playground codeText={snippet.chip} scope={{ React, Chip: DemoChip }} />

    <h2>Props</h2>
    <Table props={propDescription.chip} />

    <div style={{ marginBottom: 32 }} />

    <h1>PlusChip</h1>

    <h2>
      A PlusChip is a specialized chip that bears no label, but simply takes an action and displays
      a symbol prompting the action.
    </h2>

    <p>
      These chips can either contain their own symbol, or simply have a plus if no symbol is
      specified.
    </p>

    <h2>Usage</h2>
    <Playground codeText={snippet.plusChip} scope={{ React, PlusChip: DemoPlusChip }} />

    <h2>Props</h2>
    <Table props={propDescription.plusChip} />
  </div>)
