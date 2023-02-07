import { palette } from '../../theme/palette';

export const MuiTableSortLabel = {
  styleOverrides: {
    root: {
      width: '100%',
      justifyContent: 'space-between',
      '&:focus': {
        color: 'inherit',
        fontWeight: 'bold' as const,
      },
      '&:hover': {
        color: 'inherit',
        fontWeight: 'bold' as const,
        '& $icon': {
          opacity: 'initial' as const,
        },
      },
      '&$active': {
        fontWeight: 'bold' as const,
        color: palette.primary.main,
        '&& $icon': {
          opacity: 'initial' as const,
          color: 'inherit',
        },
        // .activeArrow is not a material-ui thing. it targets the one of the
        // two arrow of our custom icon
        '&& $icon .activeArrow': {
          fill: palette.primary.main,
        },
      },
    },
    icon: {
      opacity: 'initial' as const,
      // transition: theme.transitions.create(['transform'], {
      //   duration: theme.transitions.duration.shorter,
      // }),
    },
  },
};
