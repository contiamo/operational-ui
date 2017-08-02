import React from 'react';
import glamorous from 'glamorous';

import NavigationHeader from './Header/NavigationHeader';
import NavigationSection from './Section/NavigationSection';

import NAVIGATION_STYLE from './Navigation.style';

type MenuItem = {
  route: string,
  label: string,
};

type props = {
  className: string,
  menuItems: Array<MenuItem>,
};

const Navigation = ({ className, menuItems }: props) =>
  (<div className={className}>
    <NavigationHeader />
    <div>
      {menuItems.map(item =>
        (<NavigationSection key={item.key}>
          {item.label}
        </NavigationSection>),
      )}
    </div>
  </div>);

export default glamorous(Navigation)(NAVIGATION_STYLE);
