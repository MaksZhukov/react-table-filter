import React, { PureComponent } from 'react';
import GridLayout from 'react-grid-layout';
import PanelContainer from '../containers/Panel'
import 'react-widgets/dist/css/react-widgets.css';

class App extends PureComponent {
  state = {
  }
  addPanel = () => {
    this.props.addPanel()
  }
  removePanel = () => {
    const { panels } = this.props;
    this.props.removePanel(panels.length - 1);
  }
  render() {
    const { panels } = this.props;
    return (
      <>
        <div className="buttons">
          <button className="btn" onClick={this.addPanel}>+</button>
          <button className="btn" onClick={this.removePanel}>x</button>
        </div>
        <GridLayout className="panels" cols={4} rowHeight={300} width={1600}>
          {panels.map(panel => {
            return (<div key={panel.id} data-grid={{ x: panel.id % 4, y: 0, w: 1, h: 1 }} ><PanelContainer filters={panels[panel.id].filters} responseGetTables={panels[panel.id].responseGetTables} id={panel.id} /></div>)
          })}
        </GridLayout>
      </>
    );
  }
}

export default App;
