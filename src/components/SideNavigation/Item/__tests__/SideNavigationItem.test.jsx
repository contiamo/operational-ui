// @flow
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SideNavigationItem from '../SideNavigationItem';

test('SideNavigationItem component renders', () => {
  const output = shallow(<SideNavigationItem>Hi, I'm an Item</SideNavigationItem>);
  expect(toJson(output)).toMatchSnapshot();
});

test('SideNavigationItem handles clicks', () => {
  const click = jest.fn();
  const output = shallow(<SideNavigationItem onClick={click}>Hi, I'm an Item</SideNavigationItem>);

  output.simulate('click');
  expect(click).toHaveBeenCalled();
});
