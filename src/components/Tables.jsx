import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import 'rc-checkbox/assets/index.css';

class Tables extends PureComponent {
  render() {
    const { tables } = this.props
    return (
      <div className="tables">
        {tables.length >= 0 &&
          tables.map((table, keyTable) =>
            <table key={keyTable} className="table">
              <caption className="table-caption">{table.name}</caption>
              <thead>
                <tr>
                  {table.dimensions.map((dimension, keyDimension) => <th key={keyDimension}>{dimension}</th>)}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, keyRow) => <tr key={keyRow}>{row.map((cell,keyCell)=> cell && <td key={keyCell}>{cell.value}</td>)}</tr>)}
              </tbody>
            </table>
          )
        }
      </div>
    );
  }
}

// Tables.propTypes = {
//   tables: PropTypes.array,
// }

export default Tables;
