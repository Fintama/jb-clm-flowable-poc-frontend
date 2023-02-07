import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PdfDocumentIcon } from '../../assets/icons/pdf-document-icon.svg';
import { DocumentType, DocumentTypes } from 'features/distributedItems/distributedItemsTypes';
import { API_URL } from 'app/config';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    color: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  documentId: string;
  documentType: DocumentType;
  id?: string;
  name?: string;
};

const ViewPdf = ({ id, documentId, documentType, name }: Props) => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  let href = '';

  if (documentType === DocumentTypes.DISTRIBUTION_ITEMS) {
    href = `${API_URL}/distribution-items/${documentId}/document-content`;
  } else if (documentType === DocumentTypes.DOCUMENTS) {
    href = `${API_URL}/documents/${documentId}/document-content`;
  } else if (documentType === DocumentTypes.ALL_DOCUMENTS_CONTENT) {
    href = `${API_URL}/distributionRequests/${documentId}/allDocumentsContent`;
  }

  // because of production bug commented out for now 18.05.2022
  // const handleView = () => {
  //   getDocumentBody(documentId, documentType)
  //     .then((response) => {
  //       const blob = new Blob([response], { type: 'application/pdf' });
  //       const fileURL = URL.createObjectURL(blob);

  //       //Open the URL on new Window
  //       const pdfWindow = window.open();
  //       if (pdfWindow) {
  //         pdfWindow.location.href = fileURL;
  //       }
  //     })
  //     .catch((error) => {
  //       dispatch(
  //         openModal('ErrorDialog', {
  //           error,
  //           okHandler: () => {
  //             dispatch(closeAllModals());
  //           },
  //         })
  //       );
  //     });
  // };

  return (
    <a id={id} className={classes.root} href={href} target="_blank" rel="noopener noreferrer">
      <PdfDocumentIcon className={classes.icon} />
      {name ? name : t('common.labels.view')}
    </a>
    // because of production bug commented out for now 18.05.2022
    // <Box id={id} className={classes.root} onClick={() => handleView()}>
    //   <PdfDocumentIcon className={classes.icon} />
    //   <Typography> {name ? name : t('common.labels.view')} </Typography>
    // </Box>
  );
};

export default ViewPdf;
