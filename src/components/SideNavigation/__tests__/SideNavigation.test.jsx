// @flow
import React from 'react'
import renderer from 'react-test-renderer'

import SideNavigation from '../SideNavigation'

test('SideNavigation component renders', () => {
  const output: Object = renderer.create(<SideNavigation />)
  const tree: {} = output.toJSON()
  expect(tree).toMatchSnapshot()
})
