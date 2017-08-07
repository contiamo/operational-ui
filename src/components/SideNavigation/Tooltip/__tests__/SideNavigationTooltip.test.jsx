// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import SideNavigationTooltip from '../SideNavigationTooltip';

test('SideNavigationTooltip component renders', () => {
  const output: Object = renderer.create(
    <SideNavigationTooltip>Hi, I'm a Link</SideNavigationTooltip>,
  );
  const tree: {} = output.toJSON();
  expect(tree).toMatchSnapshot();
});
