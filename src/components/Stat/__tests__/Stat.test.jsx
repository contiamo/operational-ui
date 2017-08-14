import React from 'react';
import { shallow } from 'enzyme';

import { Stat } from '../Stat';

describe('Stat', () => {
  it('Should render', () => {
    const renderedComponent = shallow(<Stat label="Country">DE</Stat>);
    expect(renderedComponent).toMatchSnapshot();
  });
});
