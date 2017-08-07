// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import SideNavigationItem from '../SideNavigationItem';

test('SideNavigationItem component renders', () => {
  const output: Object = renderer.create(<SideNavigationItem>Hi, I'm an Item</SideNavigationItem>);
  const tree: {} = output.toJSON();
  expect(tree).toMatchSnapshot();
});
