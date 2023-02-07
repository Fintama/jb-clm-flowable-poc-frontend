import { colors } from '@mui/material';
import { jbColors } from './jbColors';

const white = '#FFFFFF';
const black = '#000000';

const palette = {
  black,
  white,
  primary: {
    contrastText: colors.common.white,
    main: jbColors.core.reflexBlue[100],
  },
  secondary: {
    contrastText: colors.common.white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400'],
  },
  success: {
    contrastText: colors.common.white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: colors.common.white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: colors.common.white,
    main: jbColors.technical.amberYellow[100],
    alertBg: '#F5E8CC',
    alertColor: '#D6A133',
  },
  error: {
    contrastText: colors.common.white,
    main: jbColors.technical.carminRed[100],
  },
  text: {
    primary: colors.common.black,
    secondary: jbColors.support.greenSmoke[80],
    link: colors.blue[600],
  },
  background: {
    default: jbColors.support.greenSmoke[10],
    paper: colors.common.white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};

export { palette };
