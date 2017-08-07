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
This is a thick sidebar that is responsible for the core navigation of your app or website.

![SideNavigation](https://contiamo.github.io/ui-components/assets/screenshots/SideNavigation/SideNavigation.gif)

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

![SideNavigation](https://contiamo.github.io/ui-components/assets/screenshots/SideNavigation/Item.png)

##### Options
This component supports one option:

| Option  | Required | Default | Type     | Description                                      |
|---------|----------|---------|----------|--------------------------------------------------|
| size    | No       | 20      | number   | How many pixels wide and high the item should be |
| onClick | No       | void    | Function | What happens on click of this item?              |

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

![SideNavigation](https://contiamo.github.io/ui-components/assets/screenshots/SideNavigation/Tooltip.png)

##### Options
This component supports one option:

| Option   | Required | Default | Type                     | Description                           |
|----------|----------|---------|--------------------------|---------------------------------------|
| position | No       | middle  | ENUM('middle', 'bottom') | Where should the tooltip be anchored? |

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

![SideNavigation](https://contiamo.github.io/ui-components/assets/screenshots/SideNavigation/Link.png)

| Option  | Required | Default | Type     | Description                        |
|---------|----------|---------|----------|------------------------------------|
| onClick | No       | void    | Function | What happens on click of the link? |

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

### Header
The header component consists of 3 subcomponents: A title, an "item", and a separator. The header component itself can take on any color you give it. Child components use alpha blending to work with whatever color this component is given.

![Header](https://contiamo.github.io/ui-components/assets/screenshots/Header/Header.gif)

| Option | Required | Default | Type   | Description                                                                                                                                                                                   |
|--------|----------|---------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| color  | No       | white   | string | This can be either a hex value (`#f00b4f`) or a named color from the theme supplied to `ThemeProvider` at app initialization. `color="primary"` would work just as well as `color="#feb901`". |

```javascript
import React from 'react';
import { Header, HeaderTitle, HeaderItem, HeaderSeparator } from 'ui-components';

const MyHeader = () => (<Header color="primary">
  <HeaderTitle>Contiamo</HeaderTitle>
  <HeaderItem>
    <Camera /> Gallery
  </HeaderItem>
  <HeaderItem>
    <Box /> Components
  </HeaderItem>
  <HeaderSeparator />
  <HeaderItem>Logout</HeaderItem>
</Header>);

export default MyHeader;

```

#### HeaderTitle
A title that displays at the beginning of the header.

![Header](https://contiamo.github.io/ui-components/assets/screenshots/Header/Title.png)

`<HeaderTitle>Contiamo</HeaderTitle>`

#### HeaderItem
A point on the header menu. This supports click behavior.

![Header](https://contiamo.github.io/ui-components/assets/screenshots/Header/Item.png)

| Option  | Required | Default | Type     | Description                                             |
|---------|----------|---------|----------|---------------------------------------------------------|
| onClick | No       | void    | Function | What happens when this item is clicked                  |
| active  | No       | false   | Boolean  | Marks the item as active with a darker background color |

`<HeaderItem onClick={() => foo}>Contiamo</HeaderItem>`

#### HeaderSeparator
A simple separator to be placed between header items.

![Header](https://contiamo.github.io/ui-components/assets/screenshots/Header/Separator.png)

`<HeaderSeparator />`

**Documentation per-component to be added.**
**Documentation refinements welcome.**
