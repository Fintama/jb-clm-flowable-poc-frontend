import { jbColors } from '../jbColors';
import { palette } from '../palette';

export const MuiInputBase = {
  styleOverrides: {
    root: {
      color: palette.black,
      '& input:disabled': {
        color: jbColors.grey.dark,
      },
      '& textarea:disabled': {
        color: jbColors.grey.dark,
      },
    },
    inputMultiline: {
      padding: '8px',
    },
    input: {
      backgroundColor: jbColors.support.greenSmoke[10],
      padding: '8px',
    },
  },
};
