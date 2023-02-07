import React from 'react';
import { RenderWithReduxAndRouter as render } from 'test/utils';
import * as redux from 'react-redux';
import { act, fireEvent, waitFor } from 'test/utils';
import { ErrorDialog } from './ErrorDialog';
import { HttpError } from '../error';

beforeAll(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ErrorDialog component', () => {

  const error: HttpError = {
    name: 'test-error',
    message: 'test-msg',
    status: 404
  };
  it('Displays Header, text and button ', () => {
    const { getByText, getByTestId } = render(
      <ErrorDialog error={ error } />,
      {},
    );

    expect(getByText('Error')).toBeInTheDocument();
    expect(getByText(error.message!.toString())).toBeInTheDocument();
    expect(getByTestId('error-dialog-ok-button')).toBeInTheDocument();
  });

  it('calls received close handler on click button ', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const { getByTestId } = render(
      <ErrorDialog error={ error } />,
      {},
    );

    act(() => {
      fireEvent.click(getByTestId('error-dialog-ok-button'));
    });

    await waitFor(() => {
      expect(useDispatchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('calls default close handler on click button ', async () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <ErrorDialog error={ error } okHandler={ mockFn } />,
      {},
    );

    act(() => {
      fireEvent.click(getByTestId('error-dialog-ok-button'));
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });


});
