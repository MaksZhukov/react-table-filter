import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';
import {
  addPanel,
  removePanel,
  getTablesSuccess,
  getTablesError,
  getTablesPending,
  changeContexts,
  changeDimensions,
  changeCells,
  changeCellsAll,
  inputSearch,
  changeOrderCells,
  toggleFilters,
  changeSearchType,
} from '../actions';

import {
  TYPE_SEARCH,
  ORDER_CELLS,
} from '../constants';


const defaultState = fromJS(JSON.parse(localStorage.getItem('store'))) || fromJS({
  panels: [],
});
const reducer = handleActions({
  [addPanel](state) {
    return state.update('panels', panels => panels.push(fromJS({
      id: new Date().getTime(),
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
    })));
  },
  [removePanel](state, { payload: id }) {
    return state.set('panels', state.get('panels').filter(panel => panel.get('id') !== id));
  },
  [getTablesSuccess](state, { payload }) {
    const { id, responseGetTables } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        const { tables } = responseGetTables;
        return panel.setIn(['filters', 'defaultContexts'], List(Object.keys(tables)))
          .set('responseGetTables', fromJS(responseGetTables));
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [getTablesError](state, { payload }) {
    const { responseGetTables, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        return panel.set('responseGetTables', responseGetTables);
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [getTablesPending](state, { payload }) {
    const { responseGetTables, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        return panel.set('responseGetTables', Map(responseGetTables));
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [changeContexts](state, { payload }) {
    const { contexts, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        const tables = panel.getIn(['responseGetTables', 'tables']);
        const dimensions = panel.getIn(['filters', 'dimensions']);
        const cells = panel.getIn(['filters', 'cells']);
        const newDefaultDimensions = [];
        const newDimensions = [];
        let newCells = [];
        tables.forEach((table, keyTable) => {
          if (contexts.indexOf(keyTable) !== -1) {
            table.forEach((dimension, keyDimension) => {
              if (dimensions.indexOf(keyDimension) !== -1) {
                newDimensions.push(keyDimension);
              }
              newDefaultDimensions.push(keyDimension);
            });
            newCells = [...newCells, ...cells.filter(cell => cell.getIn(['parents', 'context']) === keyTable)];
          }
        });
        return panel.setIn(['filters', 'contexts'], List(contexts))
          .setIn(['filters', 'defaultDimensions'], List(newDefaultDimensions))
          .setIn(['filters', 'dimensions'], List(newDimensions))
          .setIn(['filters', 'cells'], fromJS(newCells));
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [changeDimensions](state, { payload }) {
    const { dimensions, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        const tables = panel.getIn(['responseGetTables', 'tables']);
        const cells = panel.getIn(['filters', 'cells']);
        const newCells = [];
        tables.forEach((table, keyTable) => {
          table.forEach((dimension, keyDimension) => {
            if (dimensions.indexOf(keyDimension) !== -1) {
              dimension.forEach((cellValue) => {
                if (cells.size !== 0) {
                  const newCell = cells.find(cell => cell.get('value') === cellValue && cell.getIn(['parents', 'context']) === keyTable && cell.getIn(['parents', 'dimension']) === keyDimension);
                  if (newCell) {
                    newCells.push(newCell);
                  } else {
                    newCells.push({
                      parents: { dimension: keyDimension, context: keyTable },
                      checked: false,
                      visible: true,
                      value: cellValue,
                    });
                  }
                } else {
                  newCells.push({
                    parents: { dimension: keyDimension, context: keyTable },
                    checked: false,
                    visible: true,
                    value: cellValue,
                  });
                }
              });
            }
          });
        });
        return panel.setIn(['filters', 'dimensions'], List(dimensions))
          .setIn(['filters', 'cells'], fromJS(newCells));
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [changeCells](state, { payload }) {
    const { cell: changeCell, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        const index = panel.getIn(['filters', 'cells']).indexOf(changeCell);
        return panel.updateIn(['filters', 'cells', index], cell => cell.set('checked', !cell.get('checked')))
          .updateIn(['filters', 'checkedAllCells'], () => {
            const countAllChecked = panel.getIn(['filters', 'cells']).filter(cell => cell.get('visible') && cell.get('checked')).size;
            const countAllVisible = panel.getIn(['filters', 'cells']).filter(cell => cell.get('visible')).size;
            const currentChecked = changeCell.get('checked') === false && changeCell.get('visible') === true ? 1 : -1;
            return countAllChecked + currentChecked === countAllVisible;
          });
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [changeCellsAll](state, { payload: id }) {
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        if (panel.getIn(['filters', 'checkedAllCells'])) {
          return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => (cell.get('visible') === true ? cell.set('checked', false) : cell)))
            .updateIn(['filters', 'checkedAllCells'], checked => !checked);
        }
        return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => (cell.get('visible') === true ? cell.set('checked', true) : cell)))
          .updateIn(['filters', 'checkedAllCells'], checked => !checked);
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [inputSearch](state, { payload }) {
    const { value, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        const type = panel.getIn(['filters', 'search', 'type']);
        if (type === TYPE_SEARCH.all) {
          return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => (cell.get('value').toLowerCase().indexOf(value.toLowerCase()) === -1 ? cell.set('visible', false) : cell.set('visible', true))))
            .updateIn(['filters', 'search', 'value'], () => value);
        }
        if (type === TYPE_SEARCH.exact) {
          return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => (value !== '' && cell.get('value').toLowerCase() !== value.toLowerCase() ? cell.set('visible', false) : cell.set('visible', true))))
            .updateIn(['filters', 'search', 'value'], () => value);
        }
        if (type === TYPE_SEARCH.startWith) {
          return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => (cell.get('value').toLowerCase().indexOf(value.toLowerCase()) !== 0 ? cell.set('visible', false) : cell.set('visible', true))))
            .updateIn(['filters', 'search', 'value'], () => value);
        }
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [changeSearchType](state, { payload }) {
    const { type, id } = payload;
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        return panel.updateIn(['filters', 'search', 'type'], () => type);
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [changeOrderCells](state, { payload }) {
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === payload) {
        if (panel.getIn(['filters', 'orderCells']) === ORDER_CELLS.up) {
          return panel.updateIn(['filters', 'cells'], cells => cells.sort((cell1, cell2) => {
            if (cell1.get('value') > cell2.get('value')) {
              return 1;
            }
            if (cell1.get('value') < cell2.get('value')) {
              return -1;
            }
            return 0;
          }))
            .updateIn(['filters', 'orderCells'], () => ORDER_CELLS.down);
        }
        if (panel.getIn(['filters', 'orderCells']) === ORDER_CELLS.down) {
          return panel.updateIn(['filters', 'cells'], cells => cells.sort((cell1, cell2) => {
            if (cell1.get('value') > cell2.get('value')) {
              return -1;
            }
            if (cell1.get('value') < cell2.get('value')) {
              return 1;
            }
            return 0;
          }))
            .updateIn(['filters', 'orderCells'], () => ORDER_CELLS.up);
        }
      }
      return panel;
    });
    return state.set('panels', panels);
  },
  [toggleFilters](state, { payload: id }) {
    const panels = state.get('panels').map((panel) => {
      if (panel.get('id') === id) {
        return panel.update('isOpenFilters', isOpenFilters => !isOpenFilters);
      }
      return panel;
    });
    return state.set('panels', panels);
  },
},
defaultState);


export default reducer;
