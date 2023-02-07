import { jbColors } from '../jbColors';
import { colors } from '@mui/material';
import { palette } from '../palette';

export const MuiAlert = {
  styleOverrides: {
    root: {
      fontSize: 11,
      lineHeight: '14px',
      borderRadius: '0',
      letterSpacing: 0,
      backgroundColor: jbColors.support.greenSmoke[10],
    },
    standardWarning: {
      backgroundColor: palette.warning.alertBg,
      color: palette.warning.alertColor,
      border: `1px solid ${palette.warning.alertColor}`,
      '& $icon': {
        color: colors.common.white,
        backgroundColor: jbColors.technical.amberYellow[80],
      },
    },
    standardError: {
      backgroundColor: jbColors.support.red[20],
      color: jbColors.support.red[140],
      border: `1px solid ${jbColors.support.red[120]}`,
      '& $icon': {
        color: colors.common.white,
        fill: jbColors.support.red[100],
      },
    },
    icon: {
      marginRight: 12,
      padding: '7px 4px',
      opacity: 1,
      alignItems: 'center',
    },
    message: {
      padding: '4px 0',
      lineHeight: '16px',
    },
    action: {
      paddingLeft: 16,
      paddingRight: 20,
    },
  },
};
