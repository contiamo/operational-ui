// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import SideNavigationLink from '../SideNavigationLink';

test('SideNavigationLink component renders', () => {
  const output: Object = renderer.create(<SideNavigationLink>Hi, I'm a Link</SideNavigationLink>);
  const tree: {} = output.toJSON();
  expect(tree).toMatchSnapshot();
});
