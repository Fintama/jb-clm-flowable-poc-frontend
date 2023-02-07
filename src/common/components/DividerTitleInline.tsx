import React from 'react';

import { Box, Divider, Typography, Theme } from '@mui/material';
import { theme } from 'app/theme';

const DividerTitleInline = ({ text }: { text: string }) => {
  return (
    <Box display="flex" alignItems="center" my={3}>
      <Typography color="primary" variant={'body1'}>
        <strong>{text}</strong>
      </Typography>
      <Divider sx={{ marginLeft: theme.spacing(1), flex: 1 }} />
    </Box>
  );
};

export { DividerTitleInline };
