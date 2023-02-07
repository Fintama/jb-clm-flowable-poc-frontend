import React from 'react';
import { Grid, IconButton, Theme } from '@mui/material';
import { ReactComponent as PdfIcon } from '../../features/documents/modals/icons/PDF_icon.svg';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { jbColors } from '../../app/theme/jbColors';
import { FormikValues, useFormikContext } from 'formik';
import { base64toBlob } from 'common/utils/stringUtils';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  marginIcon: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  smallIcon: {
    height: '15px !important',
    width: '15px !important',
    padding: '0px',
    marginLeft: '8px',
    color: jbColors.support.greenSmoke[80],
  },
}));

type Props = {
  file: any;
  id: number;
  isBase64?: boolean;
  fileName: string;
  formikFieldName?: string;
};

const AttachmentFileRow = ({
  file,
  id,
  fileName,
  isBase64 = false,
  formikFieldName = 'attachments',
}: Props) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const { classes } = useStyles();

  function handleView() {
    const blob = isBase64
      ? base64toBlob(file.b64Data, file.mimeType)
      : new Blob([file], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(blob);

    //Open the URL on new Window
    const pdfWindow = window.open();
    if (pdfWindow) {
      pdfWindow.location.href = fileURL;
    }
  }

  function handleDelete() {
    const filteredAttachments = values[formikFieldName].filter(
      (pdf: any) => values[formikFieldName].indexOf(pdf) !== id
    );
    setFieldValue(formikFieldName, filteredAttachments);
  }

  return (
    <Grid container>
      <Grid item xs={1}>
        <PdfIcon className={classes.marginIcon} />
      </Grid>
      <Grid item xs={9}>
        {fileName}
      </Grid>
      <Grid item xs={2}>
        <IconButton
          className={classes.smallIcon}
          onClick={handleView}
          id={`view-pdf-content-${id}`}
        >
          <VisibilityIcon
            className={classes.smallIcon}
            id={`view-pdf-content-icon-${id}`}
            data-testid={`view-pdf-content-icon-${id}`}
          />
        </IconButton>
        <IconButton className={classes.smallIcon} onClick={handleDelete} id={`delete-pdf-${id}`}>
          <DeleteForeverOutlinedIcon
            className={classes.smallIcon}
            id={`delete-pdf-icon-${id}`}
            data-testid={`delete-pdf-icon-${id}`}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AttachmentFileRow;
