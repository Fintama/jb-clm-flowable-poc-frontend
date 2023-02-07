import { palette } from '../palette';

export const MuiTooltip = {
  styleOverrides: {
    tooltip: {
      border: 'none',
      borderRadius: '3px',
      filter:
        'drop-shadow(0px 6px 10px rgba(51, 51, 51, 0.14)) drop-shadow(0px 1px 18px rgba(20, 30, 85, 0.12)) drop-shadow(0px 3px 5px rgba(20, 30, 85, 0.2))',
      backgroundColor: palette.white,
      color: palette.black,
      fontSize: 12,
      whiteSpace: 'pre-line',
      padding: '8px',
    },
    arrow: {
      color: palette.white,
    },
  },
};
