import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import Multiselect from 'react-widgets/lib/Multiselect'
import DropdownList from 'react-widgets/lib/DropdownList'
import SearchInput from 'react-search-input'
import Checkbox from 'rc-checkbox';
import { TYPE_SEARCH, ORDER_CELLS } from '../constants'
import 'rc-checkbox/assets/index.css';

class Filters extends PureComponent {
  state = {
    searchType: TYPE_SEARCH.all,
    orderCells: ORDER_CELLS.up
  }
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
  handleChangeCellAll = () => {
    const { changeCellsAll, id } = this.props;
    changeCellsAll(id)
  }
  handleInputSearch = ({ target }) => {
    const { inputSearch, id } = this.props
    const { searchType } = this.state
    inputSearch({ id, value: target.value, type: searchType })
  }
  stopDraggableFilters = (event) => {
    event.stopPropagation()
  }
  handleChangeSearchType = (value) => {
    this.setState({ searchType: value })
  }
  handleChangeOrderCells = () => {
    const { changeOrderCells, id } = this.props
    const { orderCells } = this.state
    this.setState({
      orderCells: orderCells === ORDER_CELLS.up ? ORDER_CELLS.down : ORDER_CELLS.up
    })
    changeOrderCells({ id, order: orderCells })
  }
  render() {
    const { filters } = this.props
    const { searchType, orderCells } = this.state
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
            <SearchInput onMouseDown={this.stopDraggableFilters} onInput={this.handleInputSearch} className="search-input" />
            <div className="filters-search-type">
              <DropdownList
                defaultValue={searchType}
                data={[
                  TYPE_SEARCH.all,
                  TYPE_SEARCH.startWith,
                  TYPE_SEARCH.exact,
                ]}
                onChange={this.handleChangeSearchType}
              />
            </div>
            <button onClick={this.handleChangeOrderCells}>{orderCells}</button>
          </div>
          CELLS
          <div className="filters-cells">
            {filters.get('cells').filter(cell => cell.get('visible')).size > 0 &&
              <div className="filters-cells-all">
                <label>
                  <Checkbox checked={filters.get('checkedAllCells')} onChange={this.handleChangeCellAll} />
                  &nbsp; All
                </label>
              </div>
            }
            {filters.get('cells').filter(cell => cell.get('visible')).map((cell, key) =>
              <div key={key} className="filters-cells-cell">
                <label>
                  <Checkbox value={cell} checked={cell.get('checked')} onChange={this.handleChangeCell} />
                  &nbsp; {cell.get('value')}
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
  changeCells: PropTypes.func,
  changeCellsAll: PropTypes.func,
  inputSearch: PropTypes.func,
  changeOrderCells: PropTypes.func
}

export default Filters;
