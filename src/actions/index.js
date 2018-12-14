import { createAction } from 'redux-actions';
import { GET_TABLES } from '../actionTypes';

export const addPanel = createAction('ADD_PANEL');
export const removePanel = createAction('REMOVE_PANEL');
export const getTablesSuccess = createAction(GET_TABLES.SUCCESS);
export const getTablesError = createAction(GET_TABLES.ERROR);
export const getTablesPending = createAction(GET_TABLES.PENDING);
export const getTables = id => async (dispatch) => {
  try {
    dispatch(getTablesPending({ id, responseGetTables: { pending: true } }));
    const tables = await fetch('/data.json').then(response => response.json()).then(data => data);
    dispatch(getTablesSuccess({
      id,
      responseGetTables: {
        pending: false, status: 'success', tables, message: 'Get tables was success',
      },
    }));
  } catch (err) {
    dispatch(getTablesError({ id, responseGetTables: { pending: false, status: 'error', message: 'Get tables was error' } }));
  }
};
export const changeContexts = createAction('CHANGE_CONTEXTS');
export const changeDimensions = createAction('CHANGE_DIMENSIONS');
export const changeCells = createAction('CHANGE_CELLS');
export const changeCellsAll = createAction('CHANGE_CELLS_ALL');
export const inputSearch = createAction('INPUT_SEARCH');
export const changeSearchType = createAction('CHANGE_SEARCH_TYPE');
export const changeOrderCells = createAction('CHANGE_ORDER_CELLS');
export const toggleFilters = createAction('TOGGLE_FILTERS');
export const changePositionPanels = createAction('CHANGE_POSITION_PANELS');
