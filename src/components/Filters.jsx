import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
import SearchInput from 'react-search-input';
import Checkbox from 'rc-checkbox';
import { Map } from 'immutable';
import { TYPE_SEARCH } from '../constants';
import 'rc-checkbox/assets/index.css';

class Filters extends PureComponent {
  componentDidMount() {
    const { getTables, id, responseGetTables } = this.props;
    if (!responseGetTables.status || responseGetTables.status !== 'success') {
      getTables(id);
    }
  }

  handleChangeContext = (values) => {
    const { changeContexts, id } = this.props;
    changeContexts({ id, contexts: values });
  }

  handleChangeDimensions = (values) => {
    const { changeDimensions, id } = this.props;
    changeDimensions({ id, dimensions: values });
  }

  handleChangeCell = ({ target }) => {
    const { changeCells, id } = this.props;
    changeCells({ id, cell: target.value });
  }

  handleChangeCellAll = () => {
    const { changeCellsAll, id } = this.props;
    changeCellsAll(id);
  }

  handleInputSearch = ({ target }) => {
    const { inputSearch, id } = this.props;
    inputSearch({ id, value: target.value });
  }

  stopDraggableFilters = (event) => {
    event.stopPropagation();
  }

  handleChangeSearchType = (value) => {
    const { changeSearchType, id } = this.props;
    changeSearchType({ id, type: value });
  }

  handleChangeOrderCells = () => {
    const { changeOrderCells, id } = this.props;
    changeOrderCells(id);
  }

  render() {
    const { filters, id } = this.props;
    return (
      <>
        <div className="filters-header">
          Filters for №
          {' '}
          {id}
        </div>
        <div className="filters-body">
          CONTEXTS
          <div className="filters-context">
            <Multiselect
              value={filters.get('contexts').toJS()}
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
            <SearchInput onMouseDown={this.stopDraggableFilters} onInput={this.handleInputSearch} value={filters.getIn(['search', 'value'])} className="search-input" />
            <div className="filters-search-type">
              <DropdownList
                defaultValue={filters.getIn(['search', 'type'])}
                data={[
                  TYPE_SEARCH.all,
                  TYPE_SEARCH.startWith,
                  TYPE_SEARCH.exact,
                ]}
                onChange={this.handleChangeSearchType}
              />
            </div>
            <button type="button" onClick={this.handleChangeOrderCells}>
              {filters.get('orderCells')}
            </button>
          </div>
          CELLS
          <div className="filters-cells">
            {filters.get('cells').filter(cell => cell.get('visible')).size > 0
              && (
              <div className="filters-cells-all">
                <label>
                  <Checkbox checked={filters.get('checkedAllCells')} onChange={this.handleChangeCellAll} />
                  &nbsp; All
                </label>
              </div>
              )
            }
            {filters.get('cells').filter(cell => cell.get('visible')).map(cell => (
              <div key={cell} className="filters-cells-cell">
                <label>
                  <Checkbox value={cell} checked={cell.get('checked')} onChange={this.handleChangeCell} />
                  &nbsp;
                  {cell.get('value')}
                </label>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

Filters.propTypes = {
  id: PropTypes.number.isRequired,
  filters: PropTypes.instanceOf(Map).isRequired,
  responseGetTables: PropTypes.instanceOf(Map).isRequired,
  getTables: PropTypes.func.isRequired,
  changeContexts: PropTypes.func.isRequired,
  changeDimensions: PropTypes.func.isRequired,
  changeCells: PropTypes.func.isRequired,
  changeCellsAll: PropTypes.func.isRequired,
  inputSearch: PropTypes.func.isRequired,
  changeSearchType: PropTypes.func.isRequired,
  changeOrderCells: PropTypes.func.isRequired,
};

export default Filters;
