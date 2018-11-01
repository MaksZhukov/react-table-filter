import React, { PureComponent, Fragment } from 'react';
import GridLayout from 'react-grid-layout';
import Panel from './Panel'

class App extends PureComponent {
  state = {
    layout: [
      { i: 0, x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 1, x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 2, x: 4, y: 0, w: 1, h: 2 }
    ]
  }
  addPanel = () => {
    this.props.addPanel()
  }
  removePanel = () => {
    const panels = this.props.panels;
    this.props.removePanel(panels.length - 1);
  }
  render() {
    const panels = this.props.panels;
    const layout = this.state.layout;
    return (
      <Fragment>
        <div className="buttons">
          <button className="btn" onClick={this.addPanel}>+</button>
          <button className="btn" onClick={this.removePanel}>x</button>
        </div>
        <GridLayout className="panels" layout={layout} cols={4} rowHeight={300} width={1200}>
          {panels.map(panel => <div key={panel.id}><Panel /></div>)}
        </GridLayout>
      </Fragment>
    );
  }
}

export default App;
