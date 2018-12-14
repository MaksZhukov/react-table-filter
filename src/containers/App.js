import { connect } from 'react-redux';
import App from '../components/App';
import { addPanel, changePositionPanels } from '../actions';
import { panelsSelector } from '../selectors';

const mapStateToProps = state => ({ panels: panelsSelector(state) });

const mapDispatchToProps = dispatch => ({
  addPanel: () => dispatch(addPanel()),
  changePositionPanels: positions => dispatch(changePositionPanels(positions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
