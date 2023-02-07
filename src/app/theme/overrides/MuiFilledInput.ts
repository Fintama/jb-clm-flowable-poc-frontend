import { jbColors } from '../jbColors';

export const MuiFilledInput = {
  styleOverrides: {
    root: {
      marginTop: '4px',
    },
    input: {
      backgroundColor: jbColors.support.greenSmoke[10],
      borderRadius: 0,
    },
    multiline: {
      padding: 0,
    },
    underline: {
      '&:before, &&:hover:before, &:after': {
        border: 'none',
      },
    },
  },
};
