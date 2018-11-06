import React from 'react';
import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';
import Panel from './Panel'

const App = ({ panels, addPanel, removePanel }) => (
  <>
    <div className="buttons">
      <button className="btn" onClick={addPanel}>+</button>
      <button className="btn" onClick={removePanel}>x</button>
    </div>
    <GridLayout className="panels" cols={4} rowHeight={300} width={1600}>
      {panels.map(panel => {
        return (<div key={panel.get('id')} data-grid={{ x: panel.get('id') % 4, y: 0, w: 1, h: 1 }} ><Panel id={panel.get('id')} /></div>)
      })}
    </GridLayout>
  </>
)

App.propTypes = {
  panels: PropTypes.object,
  addPanel: PropTypes.func,
  removePanel: PropTypes.func
}

export default App;
