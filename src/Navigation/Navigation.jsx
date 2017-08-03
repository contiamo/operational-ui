// @flow
import React from 'react';
import glamorous from 'glamorous';

import NavigationHeader from './Header/NavigationHeader';
import NavigationSection from './Section/NavigationSection';
import NavigationLink from './Link/NavigationLink';

import style from './Navigation.style';
import MENU from './Navigation.menu';

const Navigation = ({ className }: { className: string }): React$Element<*> =>
  (<div className={className}>
    <NavigationHeader />
    <div>
      {MENU.map(section =>
        (<NavigationSection key={section.key} label={section.label}>
          {section.items.map(item =>
            (<NavigationLink key={item.key} to={item.route}>
              {item.label}
            </NavigationLink>),
          )}
        </NavigationSection>),
      )}
    </div>
  </div>);

export default glamorous(Navigation)(style);
