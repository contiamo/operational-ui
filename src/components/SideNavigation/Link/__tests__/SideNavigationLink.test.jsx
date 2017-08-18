// @flow
import React from 'react'
import { shallow } from 'enzyme'

import { SideNavigationLink, style } from '../SideNavigationLink'
import { contiamoTheme as theme } from '../../../../../index'

describe('SideNavigationLink', () => {
  it('Should render', () => {
    const renderedComponent = shallow(
      <SideNavigationLink className="hi">Hi, I'm a Link</SideNavigationLink>,
    )
    expect(renderedComponent).toMatchSnapshot()
  })
  it('Should receive proper styles', () => {
    expect(style({ theme })).toMatchObject({})
  })
  it('Should properly respond to clicks', () => {
    const fn = jest.fn()

    const renderedComponent = shallow(
      <SideNavigationLink className="hi" onClick={fn}>
        Hi, I'm a Link
      </SideNavigationLink>,
    )
    expect(renderedComponent).toMatchSnapshot()
    renderedComponent.simulate('click')
    expect(fn).toHaveBeenCalled()
  })
})
