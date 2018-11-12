import {
  connect
} from 'react-redux';
import Tables from '../components/Tables';

const mapStateToProps = (state, {
  id
}) => {
  const cells = state.getIn(['panels', id, 'filters', 'cells']).filter(cell => cell.get('checked')).toJS()
  const contexts = state.getIn(['panels', id, 'filters', 'contexts']).toJS()
  const dimensions = state.getIn(['panels', id, 'filters', 'dimensions']).toJS()
  let tables = []
  contexts.forEach(table => {
    if (cells.filter(cell => cell.parents.context === table).length !== 0) {
      let selectedDimensions = [],
        selectedCells = [],
        rows = []
      dimensions.forEach((dimension, keyDimension) => {
        if (cells.filter(cell => cell.parents.dimension === dimension && cell.parents.context === table).length !== 0) {
          selectedDimensions.push(dimension)
          selectedCells.push(cells.filter(cell => cell.parents.dimension === dimension && cell.parents.context === table))
        }
        return null
      })
      let maxLength = 0
      for (let i = 0; i < selectedCells.length; i++) {
        if (maxLength < selectedCells[i].length) {
          maxLength = selectedCells[i].length
        }
      }
      debugger
      const test = Array(maxLength)
      const res = selectedCells.map(dim=> {
        const arr = Array(maxLength)
        arr.unshift(...dim);
        return arr;
      })
      test.unshift(...res)
      console.log(test[0][1])
      const empty = test[0][1] !== 'empty'

      for (let i = 0; i < maxLength; i++) {
        rows.push([])
      }
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < selectedCells.length; j++) {
          rows[i].push(selectedCells[j][i])
        }
      }
      tables.push({
        name: table,
        dimensions: selectedDimensions,
        rows
      })
    }
  });
  return {
    tables
  }
};

export default connect(mapStateToProps)(Tables);