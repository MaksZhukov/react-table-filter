import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Panel from './Panel';


configure({ adapter: new Adapter() });
describe('component Panel', () => {
  const props = {
    id: 0,
    x: 0,
    y: 0,
    toggleFilters: jest.fn(),
    isOpenFilters: false,
    removePanel: jest.fn(),
  };
  it('render component Panel without crashing', () => {
    const wrapper = shallow(<Panel {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('component Panel with properly props', () => {
    const wrapper = shallow(<Panel {...props} />);
    expect(wrapper.instance().props.id).toEqual(0);
    expect(wrapper.instance().props.x).toEqual(0);
    expect(wrapper.instance().props.y).toEqual(0);
    expect(typeof wrapper.instance().props.toggleFilters).toBe('function');
  });
  it('component Panel without state', () => {
    const wrapper = shallow(<Panel {...props} />);
    expect(wrapper.instance().state).toBe(null);
  });
  it('component Panel contain wrong number', () => {
    const wrapper = shallow(<Panel {...props} />);
    expect(wrapper.contains(
      <span>
        №
        {' '}
        1
      </span>,
    )).toBe(false);
  });
  it('component Panel has one btn open filter', () => {
    const wrapper = shallow(<Panel {...props} />);
    expect(wrapper.find('.btn-filter').length).toBe(1);
  });
});
