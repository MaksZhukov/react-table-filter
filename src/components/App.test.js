import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { List, fromJS } from 'immutable';
import { ORDER_CELLS, TYPE_SEARCH } from '../constants';
import App from './App';


configure({ adapter: new Adapter() });
describe('component App', () => {
  const props = {
    panels: List([]),
    addPanel: jest.fn(),
  };
  it('render component App without crashing', () => {
    const wrapper = shallow(<App {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('render component App has btn for add panels', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('.btn').length).toBe(1);
  });
  it('render component App without crashing and change props with new render', () => {
    const wrapper = shallow(<App {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({
      panels: List([fromJS({
        id: 10,
        isOpenFilters: false,
        filters: {
          defaultContexts: [],
          contexts: [],
          defaultDimensions: [],
          dimensions: [],
          cells: [],
          checkedAllCells: false,
          orderCells: ORDER_CELLS.up,
          search: {
            value: '',
            type: TYPE_SEARCH.all,
          },
        },
        responseGetTables: {},
      })]),
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('render component App has btn for add panels', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('.btn').length).toBe(1);
  });
  it('render component App should call mock function when button is clicked', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find('button').simulate('click');
    expect(props.addPanel).toHaveBeenCalled();
  });
});
