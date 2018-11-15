import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import { Portal } from 'react-portal';
import FilterContainer from '../containers/Filters';
import Tables from '../containers/Tables';
import { OFFSETS_FILTERS } from '../constants';

class Panel extends PureComponent {
  startDragFilter = (event) => {
    document.querySelectorAll('.filters').forEach((filter) => {
      if (filter !== event.currentTarget) {
        filter.classList.remove('has-draggable');
      }
    });
    event.stopPropagation();
  }

  handleClickToggleFilters = () => {
    const { toggleFilters, id } = this.props;
    toggleFilters(id);
  }

  handleClickRemovePanel = () => {
    const { removePanel, id } = this.props;
    removePanel(id);
  }

  render() {
    const {
      isOpenFilters, id, x, y,
    } = this.props;

    return (
      <>
        <div className="panel">
          <button type="button" className="btn btn-filter" onClick={this.handleClickToggleFilters}>
            filter
          </button>
          <button type="button" className="btn" onClick={this.handleClickRemovePanel}>
            x
          </button>
          <span>
            №
            {' '}
            {id}
          </span>
          <Tables id={id} />
          {isOpenFilters
            && (
              <Portal node={document && document.getElementById('portal-filters')}>
                <Draggable
                  defaultClassName={classNames('react-draggable', 'has-draggable')}
                  onStart={this.startDragFilter}
                  defaultPosition={{
                    x: x * OFFSETS_FILTERS.width + OFFSETS_FILTERS.indentX,
                    y: y * OFFSETS_FILTERS.height + OFFSETS_FILTERS.indentY
                    + +(y > 0 ? OFFSETS_FILTERS.additionalIndentY : 0),
                  }}
                >
                  <div className="filters">
                    <FilterContainer id={id} />
                  </div>
                </Draggable>
              </Portal>
            )
          }
        </div>
      </>
    );
  }
}

Panel.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  isOpenFilters: PropTypes.bool.isRequired,
  removePanel: PropTypes.func.isRequired,
};

export default Panel;
