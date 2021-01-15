import {
  // Fix for strict mode warnings for some components in Material UI v4,
  // see https://github.com/mui-org/material-ui/issues/13394#issuecomment-742390313
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core';
import { ruRU } from '@material-ui/core/locale';

export const getCustomTheme = (colorTheme = 'light') => responsiveFontSizes(
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
    palette: {
      type: colorTheme,
    },
  }, ruRU),
);
