export const MuiTab = {
  styleOverrides: {
    root: {
      padding: '6px 0',
      textTransform: 'uppercase' as const,
      fontSize: 17,
      fontWeight: 300,
      minHeight: 44,
      '& ~ &': {
        marginLeft: 50,
      },
      '@media  (min-width: 600px)': {
        minWidth: 'inherit',
      },
    },
  },
};
