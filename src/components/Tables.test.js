import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Tables from './Tables';


configure({ adapter: new Adapter() });
describe('component Tables', () => {
  const props = {
    tables: [{
      name: 'table1',
      dimensions: ['dim1'],
      rows: [[{ value: 'cell1' }]],
    }],
    checkedAllCells: false,
  };
  it('render component Tables without crashing', () => {
    const wrapper = shallow(<Tables {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('dont render tables because checkedAllCells equal true', () => {
    const wrapper = shallow(<Tables {...{ ...props, checkedAllCells: true }} />);
    expect(wrapper.find('table').length).toBe(0);
  });
  it('table component has two props', () => {
    const wrapper = shallow(<Tables {...props} />);
    expect(Object.keys(wrapper.instance().props).length).toBe(2);
  });
});
