import { fromJS } from 'immutable';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addPanel, removePanel, getTablesSuccess, getTables,
} from '../actions';
import {
  GET_TABLES,
} from '../actionTypes';
import reducer from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test reducers', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const defaultState = fromJS({
    panels: [],
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, defaultState)).toEqual(defaultState);
  });
  it('should return two panel after add two panel', () => {
    const state = reducer(defaultState, addPanel());
    expect(reducer(state, addPanel()).get('panels').size).toEqual(2);
  });

  it('should return zero panels after add one panel and remove one panel', () => {
    const state = reducer(defaultState, addPanel());
    const id = state.get('panels').find((panel, key) => key === 0).get('id');
    expect(reducer(state, removePanel(id)).get('panels').size).toEqual(0);
  });
  it('should return count tables equal 1 for first panel', () => {
    const state = reducer(defaultState, addPanel());
    const id = state.get('panels').find((panel, key) => key === 0).get('id');
    const getTablesDefault = {
      id,
      responseGetTables: {
        tables: {
          table1: {
            dim1: ['cell1'],
          },
        },
      },
    };
    expect(reducer(state, getTablesSuccess(getTablesDefault)).get('panels').find((panel, key) => key === 0)
      .getIn(['responseGetTables', 'tables']).size).toEqual(1);
  });

  it('should return two actions PENDING and SUCCESS for getTables action with properly data', async () => {
    fetchMock.getOnce('/data.json', {
      body: {
        tables: {
          table1: {
            dim1: ['cell1', 'cell2'],
          },
        },
      },
      headers: { 'content-type': 'application/json' },
    });
    const state = reducer(defaultState, addPanel());
    const store = mockStore(state);
    const id = store.getState().get('panels').find((panel, key) => key === 0).get('id');
    const expectedActions = [
      {
        type: GET_TABLES.PENDING,
        payload: {
          id,
          responseGetTables: { pending: true },
        },
      },
      {
        type: GET_TABLES.SUCCESS,
        payload: {
          id,
          responseGetTables: {
            pending: false,
            status: 'success',
            message: 'Get tables was success',
            tables: {
              tables: {
                table1: {
                  dim1: ['cell1', 'cell2'],
                },
              },
            },
          },
        },
      },
    ];
    store.dispatch(getTables(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
