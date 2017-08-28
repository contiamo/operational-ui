// @flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import { Div } from 'glamorous'

import withTooltip from '../withTooltip'

const ComponentWithTooltip = withTooltip(Div)
describe('withTooltip Higher-Order Component', () => {
  it('Should return a component', () => {
    const testComponent = shallow(<ComponentWithTooltip />)
    expect(testComponent).toMatchSnapshot()
  })
  it('Should properly respond to hover', () => {
    const testComponent = shallow(<ComponentWithTooltip tooltip="howdy">hi!</ComponentWithTooltip>)
    expect(testComponent.state().isTooltipActive).toBe(false)
    testComponent.simulate('mouseenter')
    expect(testComponent.state().isTooltipActive).toBe(true)
    testComponent.simulate('mouseleave')
    expect(testComponent.state().isTooltipActive).toBe(false)
  })
})
