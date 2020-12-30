import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { ruRU } from '@material-ui/core/locale';

export const customTheme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MuiDataGrid: {
        root: {
          // Hide non-localizable text with number of selected rows
          '&& .MuiDataGrid-selectedRowCount': {
            color: 'transparent',
          },
        },
      },
    },
  }, ruRU),
);
