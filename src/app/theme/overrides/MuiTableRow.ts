import { jbColors } from '../jbColors';

export const MuiTableRow = {
  styleOverrides: {
    root: {
      cursor: 'pointer' as const,
      '&$selected, &$selected:hover': {
        backgroundColor: jbColors.core.stone[80],
      },
    },
  },
};
