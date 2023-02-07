import React, { useEffect, useRef, useState } from 'react';

import { Box, Divider, Typography, Grid } from '@mui/material';
import { jbColors } from 'app/theme/jbColors';
import { makeStyles } from 'tss-react/mui';
import { ApiRequestItemStatusType } from 'features/distributionDetails/distributionDetailsTypes';
import { Theme } from '@mui/material/styles';
import { ReactComponent as CheckIcon } from 'assets/icons/check-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close-icon.svg';
import { ReactComponent as WithdrawnIcon } from 'assets/icons/statusWithdrawn-icon.svg';
import { useTranslation } from 'react-i18next';
import { GroupedStatusList } from 'features/trackStatus/agreementUtils';
import { formatDate } from 'common/utils/dateUtils';
import { TruncatedText } from 'common/TruncatedText/TruncatedText';

// `linear-gradient(to right, #ccc 50%, maroon 50%) bottom,
// linear-gradient(to right, maroon 50%, #ccc 50%) top`;

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles()(() => ({
  divider: {
    height: '2px',
    borderRadius: '1px',
    background: ({ status }) => {
      if (status === 'OPEN' || status === 'READ' || status === 'SIGNED') {
        return jbColors.core.reflexBlue[100];
      } else if (status === 'REJECTED') {
        return jbColors.support.red[130];
      } else if (status === 'WITHDRAWN') {
        return jbColors.support.orange[110];
      }
    },
  },
}));

type StyleProps = {
  status: ApiRequestItemStatusType;
};

type Props = {
  groupedStatus: GroupedStatusList;
};

const checkIcon = <CheckIcon stroke={jbColors.core.reflexBlue[100]} />;

const renderIcon = (status: ApiRequestItemStatusType) => {
  switch (status) {
    case 'OPEN':
      return checkIcon;
    case 'READ':
      return checkIcon;
    case 'SIGNED':
      return checkIcon;
    case 'WITHDRAWN':
      return <WithdrawnIcon />;
    default:
      return <CloseIcon stroke={jbColors.support.red[130]} />;
  }
};

export const StatusHistoryBox = ({ groupedStatus }: Props) => {
  const { status, statusData } = groupedStatus;
  const { classes } = useStyles({ status });
  const { t } = useTranslation();

  const [historyBoxWidth, setHistoryBoxWidth] = useState(0);
  const statusHistoryBoxRef = useRef(null);

  useEffect(() => {
    if (statusHistoryBoxRef.current) {
      //@ts-ignore
      setHistoryBoxWidth(statusHistoryBoxRef.current.offsetWidth);
    }
  });

  return (
    <Grid sx={{ flexShrink: 0 }} item xs={3.6} mr={2} mb={2}>
      <Box className={classes.divider}></Box>
      <Grid container mt={1}>
        <Grid item xs={2} mt={0.25}>
          {renderIcon(status)}{' '}
        </Grid>
        <Grid item xs={9}>
          <Typography> {t(`trackStatus.labels.status.${status}`)}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2} />
        <Grid ref={statusHistoryBoxRef} item xs={10}>
          {statusData.map((data, index) => (
            <Box key={`${data.signatoryName}-${status}-${index}`}>
              <TruncatedText
                typographyVariant="caption"
                fontWeight={400}
                width={historyBoxWidth}
                text={`${data.signatoryName ?? ''} (${formatDate(data.statusDate)})`}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
