import React from 'react';

import Playground from 'component-playground';

import Table from '../../components/PropsTable/PropsTable';
import DemoCard from '../../../components/Card/Card';
import snippet from './snippet';
import propDescription from './propDescription';

export default () =>
  (<div>
    <h1>Cards</h1>
    <h2>
      These elements make up the UI. They accept any type of children and elegantly wrap them.
    </h2>

    <DemoCard css={{ marginBottom: 16 }} width={400} padding={16}>
      Hello, I am a card. And I can contain <em>many</em> different kinds of content.
    </DemoCard>

    <div style={{ display: 'flex' }}>
      <DemoCard css={{ marginBottom: 16 }} width={320} padding={16}>
        Hello, we are cards.<br />
      </DemoCard>
      <DemoCard css={{ marginLeft: 16, marginBottom: 16 }} width={320} padding={16}>
        Indeed, we are.<br />
        Indeed, we can.<br />
        <br />
        <img
          alt="Image"
          src="http://1.bp.blogspot.com/-TMQ0popcxJ0/Tdk9o2tS4fI/AAAAAAAAVjk/HF7UhI-M4Hs/s1600/Hey+%253B+%2529.png"
        />
      </DemoCard>
    </div>

    <DemoCard css={{ marginBottom: 32 }}>
      Hello, I am a <em>also</em> card.
    </DemoCard>

    <h2>Usage</h2>
    <Playground codeText={snippet} scope={{ React, Card: DemoCard }} />

    <h2>Props</h2>
    <Table props={propDescription} />
  </div>);
