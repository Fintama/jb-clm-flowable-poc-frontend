import { jbColors } from './jbColors';
import { palette } from './palette';

const typography = {
  fontFamily: 'Verlag, Helvetica, Arial, sans-serif',
  fontSize: 13,
  button: {
    textTransform: 'initial' as const,
    fontWeight: 'bold' as const,
  },
  h1: {
    fontWeight: 'normal' as const,
    fontSize: '25px',
    lineHeight: 1.48,
    letterSpacing: '0.8px',
    textTransform: 'uppercase' as const,
  },
  h2: {
    color: palette.primary.main,
    fontWeight: 300 as const,
    fontSize: '29px',
    letterSpacing: '-0.24px',
    lineHeight: '32px',
  },
  h3: {
    fontWeight: 300,
    fontSize: '17px',
    lineHeight: 1.47,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 300,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px',
  },
  h6: {
    color: palette.primary.main,
    fontWeight: 600,
    fontSize: '13px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  body1: {
    fontSize: '13px',
    lineHeight: 1.62,
    letterSpacing: '0.4px',
  },
  body2: {
    fontSize: '12px',
    letterSpacing: '0.4px',
    lineHeight: '18px',
  },
  caption: {
    color: jbColors.support.greenSmoke[80],
    fontWeight: 600,
    fontSize: '12px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  subtitle1: {
    color: jbColors.core.reflexBlue[100],
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
};

export { typography };
