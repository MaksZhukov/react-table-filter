import {
  handleActions
} from 'redux-actions';
import {
  fromJS,
  List,
  Map
} from 'immutable'
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
  changeOrderCells
} from '../actions';

import {
  TYPE_SEARCH,
  ORDER_CELLS
} from '../constants'


const defaultState = fromJS({
  panels: [],
});
const reducer = handleActions({
    [addPanel](state) {
      const panels = state.get('panels')
      return state.setIn(['panels', panels.size], fromJS({
        id: panels.size,
        filters: {
          defaultContexts: [],
          contexts: [],
          defaultDimensions: [],
          dimensions: [],
          cells: [],
          checkedAllCells: false,
          // search: {
          //   value: '',
          //   type: '**'
          // }
        },
        responseGetTables: {}
      }))
    },
    [removePanel](state) {
      return state.set('panels', state.get('panels').filter(panel => panel.get('id') !== state.get('panels').size - 1))
    },
    [getTablesSuccess](state, {
      payload
    }) {
      const {
        id,
        responseGetTables
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          const {
            tables
          } = responseGetTables
          return panel.setIn(['filters', 'defaultContexts'], List(Object.keys(tables)))
            .set('responseGetTables', fromJS(responseGetTables))
        }
        return panel;
      })
      return state.set('panels', panels)
    },
    [getTablesError](state, {
      payload
    }) {
      const {
        responseGetTables,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          return panel.set('responseGetTables', responseGetTables)
        }
        return panel;
      })
      return state.set('panels', panels)
    },
    [getTablesPending](state, {
      payload
    }) {
      const {
        responseGetTables,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          return panel.set('responseGetTables', Map(responseGetTables))
        }
        return panel;
      })
      return state.set('panels', panels)
    },
    [changeContexts](state, {
      payload
    }) {
      const {
        contexts,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          const tables = state.getIn(['panels', id, 'responseGetTables', 'tables'])
          const dimensions = state.getIn(['panels', id, 'filters', 'dimensions'])
          const cells = state.getIn(['panels', id, 'filters', 'cells'])
          let newDefaultDimensions = [],
            newDimensions = [],
            newCells = []
          tables.forEach((table, keyTable) => {
            if (contexts.indexOf(keyTable) !== -1) {
              table.forEach((dimension, keyDimension) => {
                if (dimensions.indexOf(keyDimension) !== -1) {
                  newDimensions.push(keyDimension)
                }
                newDefaultDimensions.push(keyDimension)
              })
              newCells = [...newCells, ...cells.filter(cell => cell.getIn(['parents', 'context']) === keyTable)]
            }
          })
          return panel.setIn(['filters', 'contexts'], List(contexts))
            .setIn(['filters', 'defaultDimensions'], List(newDefaultDimensions))
            .setIn(['filters', 'dimensions'], List(newDimensions))
            .setIn(['filters', 'cells'], fromJS(newCells))
        }
        return panel
      })
      return state.set('panels', panels)
    },
    [changeDimensions](state, {
      payload
    }) {
      const {
        dimensions,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          const tables = state.getIn(['panels', id, 'responseGetTables', 'tables'])
          let cells = state.getIn(['panels', id, 'filters', 'cells'])
          let newCells = []
          tables.forEach((table, keyTable) => {
            table.forEach((dimension, keyDimension) => {
              if (dimensions.indexOf(keyDimension) !== -1) {
                dimension.forEach(cellValue => {
                  if (cells.size !== 0) {
                    let newCell = cells.find(cell => cell.get('value') === cellValue && cell.getIn(['parents', 'context']) === keyTable && cell.getIn(['parents', 'dimension']) === keyDimension)
                    if (newCell) {
                      newCells.push(newCell)
                    } else {
                      newCells.push({
                        parents: {
                          dimension: keyDimension,
                          context: keyTable
                        },
                        checked: false,
                        visible: true,
                        value: cellValue
                      })
                    }
                  } else {
                    newCells.push({
                      parents: {
                        dimension: keyDimension,
                        context: keyTable
                      },
                      checked: false,
                      visible: true,
                      value: cellValue
                    })
                  }
                })
              }
            })
          })
          return panel.setIn(['filters', 'dimensions'], List(dimensions))
            .setIn(['filters', 'cells'], fromJS(newCells))
        }
        return panel
      })
      return state.set('panels', panels)
    },
    [changeCells](state, {
      payload
    }) {
      const {
        cell,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          const index = panel.getIn(['filters', 'cells']).indexOf(cell)
          return panel.updateIn(['filters', 'cells', index], cell => cell.set('checked', !cell.get('checked')))
        }
        return panel
      })
      return state.set('panels', panels)
    },
    [changeCellsAll](state, {
      payload
    }) {
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === payload) {
          const checked = panel.getIn(['filters', 'checkedAllCells'])
          if (checked) {
            return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => cell.get('visible') === true ? cell.set('checked', false) : cell))
              .updateIn(['filters', 'checkedAllCells'], checked => !checked)
          } else {
            return panel.updateIn(['filters', 'cells'], cells => cells.map(cell => cell.get('visible') === true ? cell.set('checked', true) : cell))
              .updateIn(['filters', 'checkedAllCells'], checked => !checked)
          }
        }
        return panel
      })
      return state.set('panels', panels)
    },
    [inputSearch](state, {
      payload
    }) {
      const {
        value,
        type,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          if (type === TYPE_SEARCH.all) {
            return panel.updateIn(['filters', 'cells'], cells => {
              return cells.map(cell => {
                return cell.get('value').indexOf(value) === -1 ? cell.set('visible', false) : cell.set('visible', true)
              })
            })
          }
          if (type === TYPE_SEARCH.exact) {
            return panel.updateIn(['filters', 'cells'], cells => {
              return cells.map(cell => {
                return value !== '' && cell.get('value') !== value ? cell.set('visible', false) : cell.set('visible', true)
              })
            })
          }
          if (type === TYPE_SEARCH.startWith) {
            return panel.updateIn(['filters', 'cells'], cells => {
              return cells.map(cell => {
                return cell.get('value').indexOf(value) !== 0 ? cell.set('visible', false) : cell.set('visible', true)
              })
            })
          }
        }
        return panel
      })
      return state.set('panels', panels)
    },
    [changeOrderCells](state, {
      payload
    }) {
      const {
        order,
        id
      } = payload
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          if (order === ORDER_CELLS.up) {
            return panel.updateIn(['filters', 'cells'], cells => cells.sort((cell1, cell2) => cell1.get('value') > cell2.get('value') ? 1 : cell1.get('value') < cell2.get('value') ? -1 : 0))
          }
          if (order === ORDER_CELLS.down) {
            return panel.updateIn(['filters', 'cells'], cells => cells.sort((cell1, cell2) => cell1.get('value') > cell2.get('value') ? -1 : cell1.get('value') < cell2.get('value') ? 1 : 0))
          }
        }
        return panel
      })
      return state.set('panels', panels)
    },
  },
  defaultState);


export default reducer;