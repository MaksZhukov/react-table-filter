import { connect } from 'react-redux';
import Panel from '../components/Panel';
import { toggleFilters, removePanel } from '../actions';


const mapStateToProps = (state, { id }) => ({
  isOpenFilters: state.get('panels').find(panel => panel.get('id') === id).get('isOpenFilters'),
});

const mapDispatchToProps = dispatch => ({
  toggleFilters: id => dispatch(toggleFilters(id)),
  removePanel: id => dispatch(removePanel(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
