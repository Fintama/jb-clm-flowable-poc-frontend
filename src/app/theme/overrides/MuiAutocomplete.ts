import { jbColors } from '../jbColors';

export default {
  styleOverrides: {
    inputRoot: {
      '&&[class*="MuiFilledInput-root"]': {
        backgroundColor: jbColors.support.greenSmoke[10],
        borderRadius: 0,
        padding: 0,
      },
    },
  },
};
