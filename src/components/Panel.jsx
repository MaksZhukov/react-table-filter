import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'
import FilterContainer from '../containers/Filters'
import Tables from '../containers/Tables'

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
    const { id } = this.props
    return (
      <>
        <div className="panel">
          <button className="btn btn-filter" onClick={this.toogleFilter}>filter</button>
          <Tables id={id} />
          {isOpenFilter &&
            <Draggable
              onStart={this.startDragFilter}
            >
              <div className="filters"><FilterContainer id={id} /></div>
            </Draggable>
          }
        </div>
      </>
    );
  }
}

Panel.propTypes = {
  id: PropTypes.number
}

export default Panel;
