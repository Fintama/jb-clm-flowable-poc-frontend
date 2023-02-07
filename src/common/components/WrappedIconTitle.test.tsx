import { render } from 'test/utils';
import React from 'react';
import { WrappedIconTitle } from './WrappedIconTitle';
import { ReactComponent as DecisionIcon } from 'features/documents/modals/icons/Decision.svg';

describe('Wrapped icon', () => {

  it('Displays the title', async () => {
      const { getByText } = render(
        <WrappedIconTitle
          text={ 'test title' }
          icon={ <DecisionIcon /> }
        />,
      );

      expect(getByText('test title')).toBeInTheDocument();
      expect(getByText('Decision.svg')).toBeInTheDocument();
    },
  );

});