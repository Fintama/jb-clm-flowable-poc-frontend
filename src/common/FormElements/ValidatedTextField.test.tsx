import {fireEvent} from "@testing-library/react";
import ValidatedTextField from "./ValidatedTextField";
import React from "react";
import {Form, Formik} from "formik";

import { getById, RenderWithReduxAndRouter as render } from 'test/utils';

describe("The text counter", () => {

    test("Is only shown when the showCharacterCount is called", async () => {
        const {queryByText} = render(<Formik initialValues={{"test-name": ""}} onSubmit={() => {
        }}>
            <Form>
                <ValidatedTextField
                    label={"test label"}
                    name={"test-name"}
                    maxChar={10}/>
            </Form>
        </Formik>, {});
       // expect(queryByText("0/10")).not.toBeInTheDocument();
    });

    test("Is rendered when it should", async () => {
        const {getByText} = render(
            <Formik initialValues={{"test-name": ""}} onSubmit={() => {
            }}>
                <Form>
                    <ValidatedTextField
                        label={"test label"}
                        name={"test-name"}
                        maxChar={10}
                        showCharacterCount/>
                </Form>
            </Formik>, {});
        expect(getByText("0/10")).toBeInTheDocument();
    });

    test("Displays the character count of the text field", async () => {
        const dom = render(
            <Formik initialValues={{"test-name": ""}} onSubmit={() => {
            }}>
                <Form>
                    <ValidatedTextField
                        label={"test label"}
                        name={"test-name"}
                        maxChar={10}
                        showCharacterCount/>
                </Form>
            </Formik>, {});


            fireEvent.change((getById(dom.container, "test-name-text-input")!), {target: {value: "hu"}});

        expect(dom.getByText("2/10")).toBeInTheDocument();
    });

});