import React from 'react';

import { CircularProgress, Box, Typography } from '@mui/material';
import { ModalStyles } from 'features/documents/modals/modalStyles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = {
  textMessage: string;
  numberInsideCircle: number;
  variant?: 'info' | 'warning';
};

const CircularProgressWithLabel = ({
  textMessage,
  numberInsideCircle,
  variant = 'info',
}: Props) => {
  const classes = ModalStyles();
  return (
    <>
      <Box
        top={-200}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Box marginRight={2}>
          <Typography variant="h6" component="div" color="primary">
            {variant === 'info' ? <InfoOutlinedIcon fontSize="large" /> : <></>}
          </Typography>
        </Box>
        <Typography variant="h6" component="div" color="primary">
          {textMessage}
        </Typography>
      </Box>
      <CircularProgress
        className={classes.circularProgress}
        style={{ width: '70px', height: '70px' }}
      />

      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="primary">
          {numberInsideCircle}
        </Typography>
      </Box>
    </>
  );
};

export default CircularProgressWithLabel;
