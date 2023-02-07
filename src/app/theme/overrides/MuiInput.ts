export const MuiInput = {
  styleOverrides: {
    root: {
      marginTop: 4,
    },
    underline: {
      '&:before, &&:hover:before, &:after': {
        border: 'none',
        borderBottomStyle: 'none !important',
      },
      '&$disabled:before': {
        border: 'none !important',
      },
    },
  },
};
