import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Multiselect } from 'react-widgets'
import SearchInput from 'react-search-input'
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class Filters extends PureComponent {
  componentDidMount() {
    const { getTables, id, responseGetTables } = this.props
    if (!responseGetTables.status || responseGetTables.status !== 'success') {
      getTables(id)
    }
  }
  handleChangeContext = (values) => {
    const { changeContexts, id } = this.props
    changeContexts({ id, contexts: values })
  }
  handleChangeDimensions = (values) => {
    const { changeDimensions, id } = this.props
    changeDimensions({ id, dimensions: values })
  }
  handleChangeCell = ({ target }) => {
    const { changeCells, id } = this.props;
    changeCells({ id, cell: target.value })
  }
  render() {
    const { filters } = this.props
    return (
      <>
        <div className="filters-header">Filters</div>
        <div className="filters-body">
          CONTEXTS
          <div className="filters-context">
            <Multiselect
              data={filters.get('defaultContexts').toJS()}
              onChange={this.handleChangeContext}
            />
          </div>
          DIMENSIONS
          <div className="filters-dimensions">
            <Multiselect
              value={filters.get('dimensions').toJS()}
              data={filters.get('defaultDimensions').toJS()}
              onChange={this.handleChangeDimensions}
            />
          </div>
          SEARCH
          <div className="filters-search">
            <SearchInput onMouseDown={(event) => { event.stopPropagation() }} className="search-input" />
          </div>
          CELLS
          <div className="filters-cells">
            {filters.get('defaultCells').map((cell, key) =>
              <div key={key} className="filters-cells-cell">
                <label>
                  <Checkbox value={cell} onChange={this.handleChangeCell} />
                  &nbsp; {cell}
                </label>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object,
  responseGetTables: PropTypes.object,
  getTables: PropTypes.func,
  changeContexts: PropTypes.func,
  changeDimensions: PropTypes.func,
  changeDefaultDimensions: PropTypes.func
}

export default Filters;
