// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import HeaderSeparator from '../HeaderSeparator'

test('HeaderSeparator component renders', () => {
  const output: Object = renderer.create(<HeaderSeparator />)
  const tree: {} = output.toJSON()
  expect(tree).toMatchSnapshot()
})
