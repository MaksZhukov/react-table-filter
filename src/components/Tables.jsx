import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import 'rc-checkbox/assets/index.css';

class Tables extends PureComponent {
  render() {
    const { tables } = this.props
    return (
      <>
        {tables.length >= 0 &&
          tables.map((table, keyTable) =>
            <table key={keyTable}>
              <caption>{table.name}</caption>
              <thead>
                <tr>
                  {table.dimensions.map((dimension, keyDimension) => <th key={keyDimension}>{dimension}</th>)}
                </tr>
              </thead>
              <tbody>
                {table.cells.map((cell, keyCell) => <tr key={keyCell}>{cell.map((value,keyValue)=><td key={keyValue}>{value.value}</td>)}</tr>)}
              </tbody>
            </table>
          )
        }
      </>
    );
  }
}

// Tables.propTypes = {
//   tables: PropTypes.array,
// }

export default Tables;
