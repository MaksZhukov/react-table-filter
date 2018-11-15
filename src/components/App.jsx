import React from 'react';
import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import PanelContainer from '../containers/Panel';

const App = ({ panels, addPanel }) => (
  <>
    <button type="button" className="btn" onClick={addPanel}>
      +
    </button>
    <GridLayout className="panels" cols={4} rowHeight={300} width={1600}>
      {panels.map((panel, key) => {
        const y = Math.floor(key / 4);
        const x = key % 4;
        return (
          <div
            key={panel.get('id')}
            data-grid={{
              x, y, w: 1, h: 1,
            }}
          >
            <PanelContainer x={x} y={y} id={panel.get('id')} />
          </div>
        );
      })}
    </GridLayout>
  </>
);

App.propTypes = {
  panels: PropTypes.instanceOf(List),
  addPanel: PropTypes.func,
};

export default App;
