import { jbColors } from '../jbColors';
import { palette } from '../palette';

export const MuiInputLabel = {
  styleOverrides: {
    root: {
      color: palette.black,
      '&$focused': {
        fontStyle: 'initial',
      },
    },
    asterisk: {
      color: jbColors.technical.red[100],
    },
  },
};
