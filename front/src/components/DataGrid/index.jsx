import React from 'react';

import { DataGrid } from '@material-ui/data-grid';

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
