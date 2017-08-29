// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import HeaderTitle from '../HeaderTitle'

test('HeaderTitle component renders', () => {
  const output: Object = renderer.create(<HeaderTitle>Hola Mundo</HeaderTitle>)
  const tree = output.toJSON()
  expect(tree).toMatchSnapshot()
})
