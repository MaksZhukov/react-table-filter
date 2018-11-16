import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS, Map } from 'immutable';
import Filters from './Filters';
import { TYPE_SEARCH, ORDER_CELLS } from '../constants';


configure({ adapter: new Adapter() });
describe('component Filters', () => {
  const filters = fromJS({
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
  });
  const props = {
    id: 0,
    filters,
    responseGetTables: Map({}),
    getTables: jest.fn(),
    changeContexts: jest.fn(),
    changeDimensions: jest.fn(),
    changeCells: jest.fn(),
    changeCellsAll: jest.fn(),
    inputSearch: jest.fn(),
    changeSearchType: jest.fn(),
    changeOrderCells: jest.fn(),
  };
  it('render component Filters without crashing', () => {
    const wrapper = shallow(
      <Filters {...props} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('render component Filters no have state', () => {
    const wrapper = shallow(
      <Filters {...props} />,
    );
    expect(wrapper.instance().state).toBe(null);
  });

  it('render component Filters has search component', () => {
    const wrapper = shallow(
      <Filters {...props} />,
    );
    expect(wrapper.find('Search').length).toBe(1);
  });
  it('render component Filters event input search works properly', () => {
    const expectData = { id: 5, value: 4 };
    let inputData = null;
    const wrapper = shallow(
      <Filters {...{
        ...props,
        ...{ id: 5, inputSearch: jest.fn((data) => { inputData = data; }) },
      }}
      />,
    );
    wrapper.find('Search').simulate('input', { target: { value: 4 } });
    expect(expectData).toEqual(inputData);
  });
  it('render component Filters contain text CELLS, DIMENSIONS, CONTEXTS, SEARCH', () => {
    const wrapper = shallow(<Filters {...props} />);
    expect(wrapper.contains('SEARCH')).toBe(true);
    expect(wrapper.contains('DIMENSIONS')).toBe(true);
    expect(wrapper.contains('CONTEXTS')).toBe(true);
    expect(wrapper.contains('CELLS')).toBe(true);
  });
});
