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
  changeCells
} from '../actions';


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
          defaultCells: [],
          cells: []
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
          let newDefaultDimensions = [],
            newDimensions = []
          tables.forEach((table, key) => {
            if (contexts.indexOf(key) !== -1) {
              table.forEach((dimension, key) => {
                if (dimensions.indexOf(key) !== -1) {
                  newDimensions.push(key)
                }
                newDefaultDimensions.push(key)
              })
            }
          })
          return panel.setIn(['filters', 'contexts'], List(contexts))
            .setIn(['filters', 'defaultDimensions'], List(newDefaultDimensions))
            .setIn(['filters', 'dimensions'], List(newDimensions))
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
          let defaultCells = []
          tables.forEach((table, key) => {
            table.forEach((dimension, key) => {
              if (dimensions.indexOf(key) !== -1) {
                defaultCells = [...defaultCells, ...dimension.toJS()]
              }
            })
          })
          return panel.setIn(['filters', 'dimensions'], List(dimensions))
            .setIn(['filters', 'defaultCells'], List(defaultCells))
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
      return state
    },
  },
  defaultState);


export default reducer;