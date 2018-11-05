import React, { PureComponent } from 'react';
import GridLayout from 'react-grid-layout';
import Draggable from 'react-draggable'
import Filter from './Filter'

class Panel extends PureComponent {
  state = {
    isOpenFilter: false
  }
  toogleFilter = () => {
    const { isOpenFilter } = this.state
    this.setState({ isOpenFilter: !isOpenFilter })
  }
  startDragFilter = (event) => {
    event.stopPropagation()
  }
  render() {
    const { isOpenFilter } = this.state;
    const { id, getTables, filters, changeContexts, changeDimensions, responseGetTables } = this.props
    return (
      <>
        <div className="panel">
          <button className="btn btn-filter" onClick={this.toogleFilter}>filter</button>
          {isOpenFilter ?
            <Draggable
              onStart={this.startDragFilter}
            >
              <div className="filters"><Filter filters={filters} id={id} getTables={getTables} changeDimensions={changeDimensions} changeContexts={changeContexts} responseGetTables={responseGetTables} /></div>
            </Draggable>
            : null}
        </div>
      </>
    );
  }
}

export default Panel;
