import React from 'react';
import glamorous from 'glamorous';

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
    <header>Contiamo</header>
    <ul>
      {menuItems.map(item =>
        (<li key={item.key}>
          {item.label}
        </li>),
      )}
    </ul>
  </div>);

export default glamorous(Navigation)(NAVIGATION_STYLE);
