import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'enzyme'

import SidebarPage from '../Sidebar'

describe('Sidebar Page', () => {
  it('Should render correctly', () => {
    expect(
      render(
        <Router>
          <SidebarPage />
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})
