import {
  handleActions
} from 'redux-actions';
import {
  fromJS,
  List,
} from 'immutable'
import {
  addPanel,
  removePanel,
  getTablesSuccess,
  getTablesError,
  getTablesPending,
  changeContexts,
  changeDimensions
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
          dimensions: [],
          cells: []
        },
        responseGetTables: {}
      }))
    },
    [removePanel](state, {
      payload
    }) {
      return state.set('panels', state.get('panels').filter(panel => panel.get('id') !== payload))
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
          return panel.set('responseGetTables', responseGetTables)
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
          return panel.setIn(['filters', 'contexts'], List(contexts))
        }
        return panel
      })
      return state.set('panels', panels)
    },
    [changeDimensions](state, {
      payload
    }) {
      const {
        contexts,
        id
      } = payload
      const tables = state.getIn(['panels', id, 'responseGetTables', 'tables'])
      const panels = state.get('panels').map(panel => {
        if (panel.get('id') === id) {
          const contexts = panel.getIn(['filters', 'contexts'])
          tables.map((table,key) => {
            if (contexts.toJS().includes(key)){
              console.log(table)
            }
          })
        }
        return panel
      })
      return state.set('panels', panels)
    },
  },
  defaultState);


export default reducer;