// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'

test('App starts', () => {
  const output: Object = renderer.create(<App />)
  const tree: {} = output.toJSON()
  expect(tree).toMatchSnapshot()
})
