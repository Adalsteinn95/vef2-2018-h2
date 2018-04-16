import React from 'react';
import { shallow } from 'enzyme';
import Updatebook from './updatebook';

describe('<Updatebook />', () => {
  test('renders', () => {
    const wrapper = shallow(<Updatebook />);
    expect(wrapper).toMatchSnapshot();
  });
});
