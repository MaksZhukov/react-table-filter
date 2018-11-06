import {
  connect
} from 'react-redux';
import App from '../components/App';
import {
  addPanel,
  removePanel,
} from '../actions';
import {
  panelsSelector
} from '../selectors'


const mapStateToProps = state => ({
  panels: panelsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  addPanel: () => dispatch(addPanel()),
  removePanel: () => dispatch(removePanel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);