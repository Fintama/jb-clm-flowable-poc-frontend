import React from 'react';

import { Typography, Grid, GridSize, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  wordWrap: {
    wordWrap: 'break-word',
  },
  fontWeight: {
    fontWeight: 600,
  },
}));

type Props = {
  title: string;
  value?: string;
  gridSize?: GridSize;
  direction?: 'row' | 'column';
};

const ValuePairGrid = ({ title, value, gridSize = 6, direction = 'column' }: Props) => {
  const { classes: styles } = useStyles();
  const directionRow = direction === 'row';

  return (
    <>
      {!directionRow && (
        <Grid item xs={gridSize}>
          <Typography variant="caption" id={`${title}-pair-title`}>
            {title}
          </Typography>
          <Typography className={styles.wordWrap} variant="body1" id={`${title}-pair-value`}>
            {value ? value : '-'}
          </Typography>
        </Grid>
      )}
      {directionRow && (
        <Grid container direction="row">
          <Typography variant="caption" id={`${title}-pair-title`}>
            {title}:
          </Typography>
          <Typography
            className={`${styles.wordWrap} ${styles.marginLeft} ${styles.fontWeight}`}
            variant="body1"
            id={`${title}-pair-value`}
          >
            {value ? value : '-'}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default ValuePairGrid;
