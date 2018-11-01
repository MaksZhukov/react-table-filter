import {
  handleActions
} from 'redux-actions';
import {
  addPanel,
  removePanel,
  getTablesSuccess,
  getTablesError,
  getTablesPending,
  getColumnsSuccess,
  getColumnsError,
  getColumnsPending,
  getCellsSuccess,
  getCellsError,
  getCellsPending
} from '../actions';



const defaultState = {
  panels: [],
};
const reducer = handleActions({
    [addPanel](state) {
      const panels = state.panels.slice();
      panels.push({
        id: panels.length,
        filters: {}
      })
      return { ...state,
        panels
      }
    },
    [removePanel](state, {
      payload
    }) {
      const panels = state.panels.slice().filter(panel => panel.id !== payload)
      return {
        ...state,
        panels
      }
    },
    [getTablesSuccess](state, {
      payload
    }) {
      console.log(state,payload)
    },
    [getTablesError](state) {

    },
    [getTablesPending](state) {

    },
    [getColumnsSuccess](state) {

    },
    [getColumnsError](state) {

    },
    [getColumnsPending](state) {

    },
    [getCellsSuccess](state) {

    },
    [getCellsError](state) {

    },
    [getCellsPending](state) {

    }
  },
  defaultState);


export default reducer;