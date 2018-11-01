import {
  createAction
} from 'redux-actions';
import {
  GET_TABLES,
  GET_CELLS,
  GET_COLUMNS
} from './../actionTypes'

export const addPanel = createAction('ADD_PANEL');
export const removePanel = createAction('REMOVE_PANEL');
export const getTablesSuccess = createAction(GET_TABLES.SUCCESS);
export const getTablesError = createAction(GET_TABLES.ERROR);
export const getTablesPending = createAction(GET_TABLES.PENDING);
export const getTables = (id) => async dispatch => {
  try {
    dispatch(getTablesPending({
      pending: true
    }))
    const tables = await fetch('/data.json').then(response => response.json()).then(data => data)
    dispatch(getTablesSuccess({
      id,
      tables,
      pending: false
    }))
  } catch (err) {
    dispatch(getTablesError({
      err,
      pending: false
    }))
  }
}
export const getColumnsSuccess = createAction(GET_COLUMNS.SUCCESS);
export const getColumnsError = createAction(GET_COLUMNS.ERROR);
export const getColumnsPending = createAction(GET_COLUMNS.PENDING);
export const getCellsSuccess = createAction(GET_CELLS.SUCCESS);
export const getCellsError = createAction(GET_CELLS.ERROR);
export const getCellsPending = createAction(GET_CELLS.PENDING);