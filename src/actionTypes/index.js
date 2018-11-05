import {
  defineAction
} from 'redux-define';
import {
  SUB_ACTIONS_TYPES
} from '../constants';

const GET_TABLES = defineAction('GET_TABLES', SUB_ACTIONS_TYPES);
export {
  GET_TABLES,
};