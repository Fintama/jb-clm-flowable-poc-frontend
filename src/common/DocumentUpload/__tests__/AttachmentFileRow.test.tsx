import React from 'react';
import { RenderWithReduxAndRouter as render } from 'test/utils';
import { Formik } from 'formik';
import AttachmentFileRow from 'common/DocumentUpload/AttachmentFileRow';
import { FileObject } from 'material-ui-dropzone';


test('Show file name, show and delete icons', () => {
  const testFile = new File([ 'foo' ], 'foo.txt', {
    type: 'text/plain',
  });
  const { getByTestId, getByText } = render(
    <Formik
      initialValues={
        {
          signatureDate: '',
          comment: '',
          deficiency: '',
          decision: '',
          attachments: [] as Array<FileObject>,
        } }
      onSubmit={ () => console.log() }
    >
      <AttachmentFileRow id={ 1 } file={ testFile } fileName={'foo.txt'}/>
    </ Formik>
    ,
    { },
  );

  expect(getByText('foo.txt')).toBeInTheDocument();
  expect(getByTestId('view-pdf-content-icon-1')).toBeInTheDocument();
  expect(getByTestId('delete-pdf-icon-1')).toBeInTheDocument();
});
