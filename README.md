# Contiamo UI Components

This repository encapsulates all of the UI components we use across our products: our intelligence platform and decision tools.

## Setup

This library depends on React and glamorous, since all of our components are styled components. If you already have them in place, proceed to the next steps. If not, you'll want to `yarn add react react-dom glamorous`.

To set up this component library, assuming you have `yarn` or `npm` installed, go ahead and

`yarn add ui-components`

Then, import the components you need into your project. Simple!

## Bootstrapping and Theme Setup

This library exposes a default theme and makes use of glamorous' handy ThemeProvider. You'll want to wrap your root element in the ThemeProvider and specify a theme you'd like to use.

By default, we expose the `contiamoTheme` for convenience.

```javascript
// app.js
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, contiamoTheme } from 'ui-components';

const App = () => (
  <ThemeProvider theme={contiamoTheme}>
    <div>Hi, I am the app</div>
  </ThemeProvider>
);

render(<App />, document.querySelector('#app'));
```

## Components

### SideNavigation
This is a thick sidebar that is responsible for the core navigation of your app or website. It is invoked as below.

```javascript
// nav.js
import React from 'react';
import { SideNavigation } from 'ui-components';

const myComponent = () => <SideNavigation />

export default myComponent;
```

Then, to use this component in your app, simply import it and use it.
Your file will look something like this:

```javascript
// app.js
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, contiamoTheme } from 'ui-components';

import myComp from './nav.js';

const App = () => (
  <ThemeProvider theme={contiamoTheme}>
    <myComp />
    <div>Hi, I am the app</div>
  </ThemeProvider>
);

render(<App />, document.querySelector('#app'));
```

Okay – that's cool, but now you literally have *just a sidebar*. The SideNavigation component also exposes subcomponents that you can compose into it in order to construct a *proper* side navigation. These components are as follows.

#### SideNavigationItem
This could be literally anything. The most common use case for this is icons.

##### Options
This component supports one option:

| Option | Description                                      | Optional |
|--------|--------------------------------------------------|----------|
| size   | How many pixels wide and high the item should be | ✅        |

##### Example
```javascript
// nav.js
import React from 'react';
import {
  SideNavigation,
  SideNavigationItem
} from 'ui-components';

const myComponent = () => (
  <SideNavigation>
    <SideNavigationItem>
      <img alt="Icon" src="https://iconlib.io/icon.svg" />
    </SideNavigationItem>
    <SideNavigationItem size={40}>
      <img alt="Icon2" src="https://iconlib.io/icon2.svg" />
    </SideNavigationItem>
  </SideNavigation>
);

export default myComponent;
```

#### SideNavigationTooltip
Each item can have a Tooltip, that displays on hover of the item.

##### Options
This component supports one option:

| Option   | Description                                               | Optional | Default |
|----------|-----------------------------------------------------------|----------|---------|
| position | Anchor the tooltip at the bottom or middle of its parent? | ✅        | middle  |

##### Example
```javascript
// nav.js
import React from 'react';
import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationTooltip,
} from 'ui-components';

const myComponent = () => (
  <SideNavigation>
    <SideNavigationItem>
      <img alt="Icon" src="https://iconlib.io/icon.svg" />
      <SideNavigationTooltip>
        Hi, I represent the icon 😎
      </SideNavigationTooltip>
    </SideNavigationItem>
  </SideNavigation>
);

export default myComponent;
```

#### SideNavigationLink
These components go inside `SideNavigationTooltip` and allow you to create stackable pull-out menus that are toggled on hover of the `SideNavigationItem` that they are contained by.

| Option  | Description                                  | Optional | Default | Type     |
|---------|----------------------------------------------|----------|---------|----------|
| onClick | Action to trigger on click of this component | ✅        |         | Function |

##### Example
```javascript
// nav.js
import React from 'react';
import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationTooltip,
  SideNavigationLink
} from 'ui-components';

const myComponent = () => (
  <SideNavigation>
    <SideNavigationItem>
      <img alt="Icon" src="https://iconlib.io/icon.svg">
      <SideNavigationTooltip>
        <SideNavigationLink onClick={() => goToLink('hi')}>Hi</SideNavigationLink>
        <SideNavigationLink onClick={() => goToLink('bye')}>Bye</SideNavigationLink>
      </SideNavigationTooltip>
    </SideNavigationItem>
  </SideNavigation>
);

export default myComponent;
```

**Documentation per-component to be added.**
**Documentation refinements welcome.**
