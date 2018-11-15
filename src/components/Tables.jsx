import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'rc-checkbox/assets/index.css';

class Tables extends PureComponent {
  render() {
    const { tables, checkedAllCells } = this.props;
    return (
      <div className="tables">
        {tables.length >= 0 && !checkedAllCells
          && tables.map(table => (
            <table key={table} className="table">
              <caption className="table-caption">
                {table.name}
              </caption>
              <thead>
                <tr>
                  {table.dimensions.map(dimension => (
                    <th key={dimension}>
                      {dimension}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowKey) => (
                  <tr key={rowKey.toString()}>
                    {row.map((cell, keyCell) => (
                      <td key={keyCell.toString()}>
                        {cell && cell.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ))
        }
      </div>
    );
  }
}

Tables.propTypes = {
  tables: PropTypes.instanceOf(Array).isRequired,
  checkedAllCells: PropTypes.bool.isRequired,
};

export default Tables;
