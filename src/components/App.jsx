import React, { PureComponent } from 'react';
import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';
import PanelContainer from '../containers/Panel';

class App extends PureComponent {
  handleGridLayoutChange = (positions) => {
    const { changePositionPanels } = this.props;
    changePositionPanels(positions);
  }

  render() {
    const { panels, addPanel } = this.props;
    return (
    <>
      <button type="button" className="btn" onClick={addPanel}>
        +
      </button>
      <GridLayout className="panels" cols={4} rowHeight={300} width={1600} onLayoutChange={this.handleGridLayoutChange}>
        {panels.map(panel => (
          <div
            key={panel.get('id')}
            data-grid={{
              x: panel.get('x'), y: panel.get('y'), w: 1, h: 1,
            }}
          >
            <PanelContainer x={panel.get('x')} y={panel.get('y')} id={panel.get('id')} />
          </div>
        ))}
      </GridLayout>
    </>);
  }
}

App.propTypes = {
  panels: PropTypes.objectOf(PropTypes.any).isRequired,
  addPanel: PropTypes.func.isRequired,
  changePositionPanels: PropTypes.func.isRequired,
};

export default App;
