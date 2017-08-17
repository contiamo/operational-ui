import React from 'react';
import { Link } from 'react-router-dom';

import Playground from 'component-playground';

import Table from '../../components/PropsTable/PropsTable';
import DemoSidebar, { SidebarItem, SidebarLink } from '../../../components/Sidebar/Sidebar';
import snippet from './snippet';
import propDescription from './propDescription';

const fetch = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

export default () =>
  (<div>
    <h1>Sidebar</h1>

    <h2>
      The sidebar is a dynamic list-style navigational element to be used in cases with a large
      number of list-style actionable items.
    </h2>

    <div>
      <p>This component involves composition of two constituent elements. Namely,</p>
      <ul>
        <li>
          <a href="#sidebar-item">SidebarItem</a>
        </li>
        <li>
          <a href="#sidebar-link">SidebarLink</a>
        </li>
      </ul>
    </div>

    <div style={{ marginBottom: 32 }} />

    <h2>Usage</h2>
    <Playground
      codeText={snippet}
      scope={{ React, Sidebar: DemoSidebar, SidebarItem, SidebarLink, fetch }}
    />

    <div style={{ marginBottom: 32 }} />

    <h1 id="sidebar-item">SidebarItem</h1>
    <h2>An expandable group of SidebarLinks, with added asynchronous functionality.</h2>

    <Table props={propDescription.sidebarItem} />
    <p style={{ marginTop: 16, marginBottom: 32 }}>
      <strong>
        Note: This component is wrapped with <Link to="/tooltips">withTooltip</Link> and thus
        exposes all of the props that such components do.
      </strong>
    </p>

    <h1 id="sidebar-link">SidebarLink</h1>
    <h2>A link, but with onClick instead of href.</h2>

    <Table props={propDescription.sidebarLink} />
    <p style={{ marginTop: 16, marginBottom: 32 }}>
      <strong>
        Note: This component is wrapped with <Link to="/tooltips">withTooltip</Link> and thus
        exposes all of the props that such components do.
      </strong>
    </p>
  </div>);
