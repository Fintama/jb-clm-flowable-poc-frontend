import React, { useState } from 'react';

import { Box, Collapse, IconButton, Alert } from '@mui/material';
import { jbColors } from 'app/theme/jbColors';
import { palette } from 'app/theme/palette';
import { AlertColor } from '@mui/lab';
import { makeStyles } from 'tss-react/mui';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning-icon.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/error-icon.svg';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const collapsibleAlertStyles = makeStyles()(() => ({
  icon: {
    fill: ({ severity }: IconColor) => {
      switch (severity) {
        case 'info':
          return jbColors.technical.persianBlue[80];
        default:
          return palette.warning.alertColor;
      }
    },
  },
}));

type IconColor = {
  severity?: AlertColor;
};

type Props = {
  text: string;
  isTextHtml?: boolean;
  collapsible?: boolean;
} & IconColor;

const CollapsibleAlert = ({
  text,
  isTextHtml = false,
  severity = 'warning',
  collapsible = true,
}: Props) => {
  const [warningOpen, setWarningOpen] = useState(true);
  const { classes: css } = collapsibleAlertStyles({ severity });

  const icon = (severity: AlertColor) => {
    switch (severity) {
      case 'error':
        return <ErrorIcon />;
      default:
        return <WarningIcon />;
    }
  };

  return (
    <Collapse in={warningOpen}>
      <Alert
        icon={icon(severity)}
        severity={severity}
        action={
          collapsible ? (
            <IconButton id="close" onClick={() => setWarningOpen(false)} aria-label="close">
              <HighlightOffIcon fontSize="medium" className={css.icon} />
            </IconButton>
          ) : null
        }
      >
        {isTextHtml ? <Box dangerouslySetInnerHTML={{ __html: `${text}` }} /> : <Box> {text} </Box>}
      </Alert>
    </Collapse>
  );
};

export default CollapsibleAlert;
