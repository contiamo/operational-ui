// @flow
import React from 'react'
import { shallow } from 'enzyme'

import { HeaderItem } from '../HeaderItem'

describe('HeaderItem', () => {
  it('Renders', () => {
    const output = shallow(<HeaderItem>My name is Ed</HeaderItem>)
    expect(output).toMatchSnapshot()
  })

  it('Handles click', () => {
    const click = jest.fn()
    const output = shallow(<HeaderItem onClick={click}>My name is Ed</HeaderItem>)

    output.simulate('click')
    expect(click).toHaveBeenCalled()
  })

  it('Looks different when active', () => {
    const output = shallow(<HeaderItem active>My name is Ed</HeaderItem>)
    expect(output).toMatchSnapshot()
  })
})
