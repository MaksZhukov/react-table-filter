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
        invertedSelectedCells = []
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
      for (let i = 0; i < maxLength; i++) {
        invertedSelectedCells.push([])
        for (let j = 0; j < selectedCells[i].length; j++) {
          selectedCells[i, j].forEach(cell => {
            invertedSelectedCells[i].push(cell)
          })
        }
        console.log(invertedSelectedCells)
      }
      tables.push({
        name: table,
        dimensions: selectedDimensions,
        cells: invertedSelectedCells
      })
    }
  });
  return {
    tables
  }
};

export default connect(mapStateToProps)(Tables);