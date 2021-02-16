import React from 'react';

import { DataGrid } from '@material-ui/data-grid';

function CustomGrid({ ...props }) {
  return (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <DataGrid
        pageSize={10}
        autoHeight
        rowHeight={42}
        disableColumnMenu
        checkboxSelection
        rowsPerPageOptions={[10, 20]}
        {...props}
      />
    </div>
  );
}

export default CustomGrid;
