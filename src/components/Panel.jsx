import React, { PureComponent, Fragment } from 'react';
import Draggable from 'react-draggable';

class Panel extends PureComponent {
  toogleFilter = () => {

  }
  render() {
    return (
      <div className="panel">
        <button onClick={this.toogleFilter()}>Open filter</button>
      </div>
    );
  }
}

export default Panel;
