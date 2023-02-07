import { jbColors } from '../jbColors';

export const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      '& $notchedOutline': {
        borderColor: '#979797',
        borderRadius: 0,
      },
      '&:hover $notchedOutline': {
        borderColor: jbColors.core.reflexBlue[70],
      },
    },
    input: {
      backgroundColor: jbColors.support.greenSmoke[10],
    },
    inputMultiline: {
      padding: 12,
    },
    multiline: {
      '&$marginDense': {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
};
