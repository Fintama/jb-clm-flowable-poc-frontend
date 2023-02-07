import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';
import { palette } from 'app/theme/palette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'inline-flex',
    position: 'relative',
  },

  buttonProgress: {
    color: palette.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type Props = {
  loading?: boolean;
} & ButtonProps;

export const LoadingButton = ({ disabled = false, loading = false, children, ...props }: Props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      {/* loading overrides disabled */}
      <Button {...props} disabled={loading || disabled}>
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};
