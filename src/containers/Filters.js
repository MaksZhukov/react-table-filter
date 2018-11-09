import {
  connect
} from 'react-redux';
import Filter from '../components/Filters';
import {
  getTables,
  changeContexts,
  changeDimensions,
  changeCells,
  changeCellsAll,
  inputSearch,
  changeOrderCells
} from '../actions'


const mapStateToProps = (state, {
  id
}) => ({
  filters: state.getIn(['panels', id, 'filters']),
  responseGetTables: state.getIn(['panels', id, 'responseGetTables'])
});

const mapDispatchToProps = dispatch => ({
  getTables: (id) => dispatch(getTables(id)),
  changeContexts: ({
    id,
    contexts
  }) => dispatch(changeContexts({
    id,
    contexts
  })),
  changeDimensions: ({
    id,
    dimensions
  }) => dispatch(changeDimensions({
    id,
    dimensions
  })),
  changeCells: ({
    id,
    cell
  }) => dispatch(changeCells({
    id,
    cell
  })),
  changeCellsAll: (id) => dispatch(changeCellsAll(id)),
  inputSearch: ({
    id,
    value,
    type
  }) => dispatch(inputSearch({
    id,
    value,
    type
  })),
  changeOrderCells: ({
    id,
    order
  }) => dispatch(changeOrderCells({
    id,
    order
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);