import {
  connect
} from 'react-redux';
import App from '../components/App';
import {
  addPanel,
  removePanel,
  getTables,
} from '../actions';
import {
  panelsSelector
} from '../selectors'


const mapStateToProps = state => ({
  panels: panelsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  addPanel: () => dispatch(addPanel()),
  removePanel: (id) => dispatch(removePanel(id)),
  getTables: (id) => dispatch(getTables(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);