import React, { PureComponent } from 'react';
import { Multiselect } from 'react-widgets'
import { changeDimensions } from '../actions';

class Panel extends PureComponent {
  componentDidMount() {
    const { getTables, id, responseGetTables } = this.props
    if (!responseGetTables.status || responseGetTables.status !== 'success') {
      getTables(id)
    }
  }
  handleChangeContext = (values) => {
    const { changeContexts, id, changeDimensions } = this.props
    changeContexts({ id, contexts: values })
    changeDimensions({ id, contexts: values })
  }
  render() {
    const { filters } = this.props
    return (
      <>
        <div className="filters-header">Filters</div>
        <div className="filters-body">
          <div className="filters-context">
            CONTEXTS
            <Multiselect
              data={filters.defaultContexts}
              onChange={this.handleChangeContext}
            />
          </div>
          <div className="filters-dimensions">
            DIMENSIONS
            <Multiselect
              data={[filters.dimensions]}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Panel;
