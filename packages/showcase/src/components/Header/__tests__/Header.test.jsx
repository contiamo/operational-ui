import React from 'react'
import { shallow } from 'enzyme'

import Header from '../Header'

describe('App Showcase: Header', () => {
  it('Should render correctly', () => {
    expect(shallow(<Header />)).toMatchSnapshot()
  })
})
