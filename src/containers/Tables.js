import { connect } from 'react-redux';
import Tables from '../components/Tables';

const mapStateToProps = (state, {
  id,
}) => {
  const panel = state.get('panels').find(pan => pan.get('id') === id);
  const cells = panel.getIn(['filters', 'cells']).filter(cell => cell.get('checked')).toJS();
  const contexts = panel.getIn(['filters', 'contexts']).toJS();
  const dimensions = panel.getIn(['filters', 'dimensions']).toJS();
  const checkedAllCells = panel.getIn(['filters', 'checkedAllCells']);
  const tables = [];
  contexts.forEach((table) => {
    if (cells.filter(cell => cell.parents.context === table).length !== 0) {
      const selectedDimensions = [];
      const selectedCells = [];
      dimensions.forEach((dimension) => {
        const cellsInTheDim = cells.filter(c => c.parents.dimension === dimension
          && c.parents.context === table);
        if (cellsInTheDim.length !== 0) {
          selectedDimensions.push(dimension);
          selectedCells.push(cellsInTheDim);
        }
      });
      const maxLength = Math.max(...selectedCells.map(cell => cell.length));
      const rows = Array(maxLength).fill(null).map(() => []);
      rows.forEach((row, keyRow) => {
        selectedCells.forEach((cell, keyCell) => {
          row.push(selectedCells[keyCell][keyRow]);
        });
      });
      tables.push({
        name: table,
        dimensions: selectedDimensions,
        rows,
      });
    }
  });
  return { tables, checkedAllCells };
};

export default connect(mapStateToProps)(Tables);
