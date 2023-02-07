import { alpha } from '@mui/material';
import { jbColors } from '../../theme/jbColors';
import { typography } from '../../theme/typography';

export const MuiTableCell = {
  styleOverrides: {
    root: {
      ...typography.body2,
      fontWeight: 300,
      borderBottom: `1px solid ${alpha(jbColors.app.lightGrey, 0.5)}`,
    },
    head: {
      ...typography.body2,
      fontWeight: 400,
      padding: '8px 16px',
      borderBottomColor: jbColors.support.greenSmoke[60],
      color: jbColors.support.greenSmoke[100],
    },
    sizeSmall: {
      padding: '7px 24px 7px 16px',
    },
  },
};
