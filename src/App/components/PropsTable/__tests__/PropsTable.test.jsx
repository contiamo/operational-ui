import React from 'react';
import { shallow } from 'enzyme';

import Table from '../PropsTable';

const sampleProps = {
  name: 'Hello',
  defaultValue: 'false',
};

describe('PropsTable', () => {
  it('Should render correctly', () => {
    expect(shallow(<Table />)).toMatchSnapshot();
  });
  it('Should render correctly with props', () => {
    expect(shallow(<Table props={sampleProps} />)).toMatchSnapshot();
  });
});
