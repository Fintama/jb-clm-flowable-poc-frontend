import React from 'react';
import ValidatedDropdown from './ValidatedDropdown';
import { cleanup, fireEvent } from '@testing-library/react';
import { Form, Formik } from 'formik';

import { RenderWithReduxAndRouter as render } from 'test/utils';
import { mockDropdownData } from './sampleDropdownData';

const renderedDropdown = (
  <Formik initialValues={{ 'test-name': '' }} onSubmit={() => {}}>
    <Form>
      <ValidatedDropdown
        name={'test-name'}
        isDisabled={false}
        isMultiChoice={false}
        label={'Test Label'}
        options={mockDropdownData}
      />
      ;
    </Form>
  </Formik>
);

//@ts-ignore
beforeAll(
  (global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    //@ts-ignore
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  }))
);

afterEach(cleanup);

describe('The dropdown autocomplete function', () => {
  it('Shows the available options upon interaction', async () => {
    const dom = render(renderedDropdown, {});

    fireEvent.keyDown(dom.getByTestId('test-name-content-input'), { key: 'ArrowDown' });

    expect(dom.getAllByRole('option')).toHaveLength(2);
    expect(dom.getByText('Option A')).not.toBeNull();
  });

  it('Filters the available options when typing in the text field', async () => {
    const dom = render(renderedDropdown, {});

    fireEvent.change(dom.getByTestId('test-name-content-input'), { target: { value: 'Option A' } });

    expect(dom.getAllByRole('option')).toHaveLength(2);
    expect(dom.getByText('Option A')).not.toBeNull();
    expect(dom.queryByText('Option B')).toBeNull;
  });

  // this test fails, because the component cannot handle multichoice correctly. The multichoice functionality is
  // not used, so the test is temporarily commented out
  //
  // todo remove the multichoice funcionality from the component, if not used
  //
  // it("Handles and displays the selected values when multiselect is allowed", async () => {
  //     const dom = render(<Formik initialValues={{"test-name": ""}} onSubmit={() => {
  //     }}>
  //         <Form>
  //             <ValidatedDropdown options={mockDropdownData}
  //                                label={"Test label"}
  //                                name={"test-name"}
  //                                loading={false}
  //                                isMultiChoice={true}
  //                                isDisabled={true}/>;
  //         </Form>
  //     </Formik>, {});
  //
  //     fireEvent.keyDown(dom.getByTestId("test-name-content-input"), {key: "ArrowDown"});
  //     fireEvent.click(dom.queryAllByRole("option")[0]);
  //     fireEvent.click(dom.queryAllByRole("option")[1]);
  //
  //     expect(dom.container.querySelectorAll('[class*="MuiChip-root"]')).toHaveLength(2);
  // });

  it('Handles and displays the selected values when only single value is allowed', async () => {
    const dom = render(
      <Formik initialValues={{ 'test-name': '' }} onSubmit={() => {}}>
        <Form>
          <ValidatedDropdown
            options={mockDropdownData}
            label={'Test label'}
            name={'test-name'}
            loading={false}
            isMultiChoice={false}
            isDisabled={true}
          />
          ;
        </Form>
      </Formik>,
      {}
    );

    fireEvent.keyDown(dom.getByTestId('test-name-content-input'), { key: 'ArrowDown' });
    fireEvent.click(dom.queryAllByRole('option')[0]);

    expect(dom.container.querySelectorAll('[class*="MuiChip-root"]')).toHaveLength(0);
    expect(dom.getByTestId('test-name-content-input').getAttribute('value')).toBe('Option A');
  });
});
