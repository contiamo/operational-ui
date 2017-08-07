// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../Header';

test('Header component renders', () => {
  const output: Object = renderer.create(<Header>Hello</Header>);
  const tree: {} = output.toJSON();
  expect(tree).toMatchSnapshot();
});
