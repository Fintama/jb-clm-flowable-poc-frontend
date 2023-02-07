import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';

import { HttpError } from 'common/error';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  Theme,
} from '@mui/material';
import { jbColors } from 'app/theme/jbColors';
import { closeModal } from 'features/modals/modalsActions';
import { makeStyles } from 'tss-react/mui';

type Props = {
  error: HttpError | AxiosError;
  okHandler?: () => void;
};

const useStyles = makeStyles()((theme: Theme) => ({
  content: {
    '& > *:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  title: {
    marginTop: theme.spacing(1.5),
    textTransform: 'uppercase',
    lineHeight: 1,
  },
  divider: {
    flex: 1,
    backgroundColor: jbColors.technical.carminRed[100],
  },
}));

export const ErrorDialog = ({ error, okHandler }: Props) => {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(t('dialogs.error.title'));
  const [bodyText, setBodyText] = useState(`${error.message}`);

  useEffect(() => {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 403) {
        setTitle(t('dialogs.error.access.forbiddenTitle'));
        setBodyText(t('dialogs.error.access.forbiddenMessage') as string);
      }
    }
  }, []);

  const handleOk = () => {
    if (okHandler) {
      okHandler();
    } else {
      dispatch(closeModal()); // close self
    }
  };

  return (
    <Dialog
      id="error-dialog"
      maxWidth="xs"
      open={true}
      fullWidth={true}
      aria-labelledby="new-agreement-set-dialog-title"
      PaperProps={{ square: true }}
    >
      <DialogContent className={classes.content}>
        <Typography variant="h3" color="error" className={classes.title}>
          {title}
        </Typography>

        <Divider className={classes.divider} />

        <Typography>{bodyText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleOk}
          color="primary"
          id={'error-dialog-ok-button'}
          data-testid={'error-dialog-ok-button'}
        >
          {t('dialogs.error.actions.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
