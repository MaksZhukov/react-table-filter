import {
  connect
} from 'react-redux';
import Panel from '../components/Panel';
import {
  getTables,
  changeContexts,
  changeDimensions
} from '../actions'


const mapStateToProps = state => ({

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
    contexts
  }) => dispatch(changeDimensions({
    id,
    contexts
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);