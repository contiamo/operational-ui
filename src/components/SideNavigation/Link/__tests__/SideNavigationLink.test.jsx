// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { SideNavigationLink, style } from '../SideNavigationLink';
import { contiamoTheme as theme } from '../../../../../index';

describe('SideNavigationLink', () => {
  it('Should render properly', () => {
    const output = shallow(<SideNavigationLink className="hi">Hi, I'm a Link</SideNavigationLink>);
    expect(output).toMatchSnapshot();
  });
  it('Should receive proper styles', () => {
    expect(style({ theme })).toMatchObject({});
  });
});
