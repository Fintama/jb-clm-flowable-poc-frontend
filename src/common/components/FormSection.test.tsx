import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { FormSection } from './FormSection';
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react';
import { Typography } from '@mui/material';
import { getById } from 'test/utils';

const renderedSection = (
  <FormSection title={'Test title'} avatar={<DescriptionIcon />}>
    <div>
      <Typography variant={'h1'}>Test child component</Typography>
    </div>
  </FormSection>
);

describe('Form section', () => {
  it('Displays the title', async () => {
    const { getByText } = render(renderedSection);
    expect(getByText('Test title')).toBeInTheDocument();
  });
  it('Displays the child components', async () => {
    const { getByText } = render(renderedSection);
    expect(getByText('Test child component')).toBeInTheDocument();
  });

  it('Hides content when collapsed', async () => {
    const { container, queryByText } = render(renderedSection);
    act(() => {
      fireEvent.click(getById(container, 'Test-expand')!);
    });
    await waitFor(() => expect(queryByText('Test child component')).toBeNull());
    // act(() => {
    //   expect(queryByText('Test child component')).toBeNull();
    // });
  });

  it('Shows content when collapsed and then re-opened', async () => {
    const dom = render(renderedSection);
    act(() => {
      fireEvent.click(getById(dom.container, 'Test-expand')!);
    });

    act(() => {
      fireEvent.click(getById(dom.container, 'Test-expand')!);
    });

    act(() => {
      expect(dom.getByText('Test child component')).toBeInTheDocument();
    });
  });
});
