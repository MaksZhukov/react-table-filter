import {
  connect,
} from 'react-redux';
import Filter from '../components/Filters';
import {
  getTables, changeContexts, changeDimensions,
  changeCells, changeCellsAll, inputSearch, changeOrderCells,
  changeSearchType,
} from '../actions';


const mapStateToProps = (state, { id }) => ({
  filters: state.get('panels').find(panel => panel.get('id') === id).get('filters'),
  responseGetTables: state.get('panels').find(panel => panel.get('id') === id).get('responseGetTables'),
});

const mapDispatchToProps = dispatch => ({
  getTables: id => dispatch(getTables(id)),
  changeContexts: ({ id, contexts }) => dispatch(changeContexts({ id, contexts })),
  changeDimensions: ({ id, dimensions }) => dispatch(changeDimensions({ id, dimensions })),
  changeCells: ({ id, cell }) => dispatch(changeCells({ id, cell })),
  changeCellsAll: id => dispatch(changeCellsAll(id)),
  inputSearch: ({ id, value }) => dispatch(inputSearch({ id, value })),
  changeSearchType: ({ id, type }) => dispatch(changeSearchType({ id, type })),
  changeOrderCells: id => dispatch(changeOrderCells(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
