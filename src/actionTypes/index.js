import {
  defineAction
} from 'redux-define';
import {
  SUB_ACTIONS_TYPES
} from '../constants';

const GET_TABLES = defineAction('GET_TABLES', SUB_ACTIONS_TYPES);
const GET_COLUMNS = defineAction('GET_COLUMNS', SUB_ACTIONS_TYPES);
const GET_CELLS = defineAction('GET_CELLS', SUB_ACTIONS_TYPES);
export {
  GET_TABLES,
  GET_COLUMNS,
  GET_CELLS
};