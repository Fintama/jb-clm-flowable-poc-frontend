import React from 'react';

import { Box, Divider, Typography } from '@mui/material';
import { jbColors } from 'app/theme/jbColors';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  divider: {
    flex: 1,
    marginTop: 0,
    backgroundColor: jbColors.core.reflexBlue[40],
  },
}));

const DividerTitle = ({ text }: { text: string }) => {
  const { classes } = useStyles();
  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant={'body1'}>
          <strong>{text}</strong>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
    </>
  );
};

export { DividerTitle };
