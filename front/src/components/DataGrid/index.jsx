import { DataGrid } from '@material-ui/data-grid';
import React from 'react';

function CustomGrid({
  rows, columns, ...otherProps
}) {
  return (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        rowHeight={42}
        checkboxSelection
        rowsPerPageOptions={[10, 20]}
        {...otherProps}
      />
    </div>
  );
}

export default CustomGrid;
