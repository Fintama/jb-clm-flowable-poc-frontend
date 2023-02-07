import { palette } from '../palette';
import { colors } from '@mui/material';

export const MuiButton = {
  styleOverrides: {
    root: {
      padding: '6px 24px',
      borderRadius: 'initial',
    },
    contained: {
      boxShadow: 'initial',
      '&:hover': {
        boxShadow: 'initial',
      },
    },
    containedPrimary: {
      '&$disabled': {
        color: colors.common.white,
        backgroundColor: palette.primary.main,
        opacity: 0.4,
      },
    },
    outlined: {
      padding: '5px 23px',
      borderRadius: 'initial',
    },
  },
};
