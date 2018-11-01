import {
  connect
} from 'react-redux';
import App from '../components/App';
import {
  addPanel,
  removePanel,
  getTables
} from '../actions';


const mapStateToProps = state => ({
  panels: state.panels
});

const mapDispatchToProps = dispatch => ({
  addPanel: () => dispatch(addPanel()),
  removePanel: (id) => dispatch(removePanel(id)),
  getTables: (id) => dispatch(getTables(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);