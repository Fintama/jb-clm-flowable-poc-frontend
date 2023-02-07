import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from 'app/theme';

type Props = {
  id?: string;
  text: string;
  icon: ReactNode;
};

const WrappedIconTitle = ({ text, icon, id }: Props) => {
  return (
    <Box id={id} display="flex" alignItems="center" mb={2}>
      {icon}
      <Typography variant="subtitle1" color="primary" sx={{ marginLeft: theme.spacing(2) }}>
        {text}
      </Typography>
    </Box>
  );
};

export { WrappedIconTitle };
