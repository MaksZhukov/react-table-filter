import {
  createSelector
} from 'reselect';


const getPanels = state => state.get('panels');

export const panelsSelector = createSelector(getPanels, panels => panels.toJS());