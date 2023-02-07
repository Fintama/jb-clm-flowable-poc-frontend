import React from "react";

import { RenderWithReduxAndRouter as render} from 'test/utils';
import CustomDatePicker from "./CustomDatePicker";
import {Formik} from "formik";

// @ts-ignore
import * as yup from "yup";
import {fireEvent, waitFor} from "@testing-library/react";

describe("The date picker", () => {

    test("Shows errors from the validation schema", async () => {
        const dom = render(
            <Formik onSubmit={() => {
            }}
                    validateOnChange={true}
                    validationSchema={yup.object().shape({
                        dateOfBirth: yup.date().typeError("Invalid date!"),
                    })}
                    initialValues={{}}><CustomDatePicker label={"test-label"}
                                                                  name={"dateOfBirth"}/></Formik>,
            {initialState: {}});
        const datePicker = document.getElementById('dateOfBirth-date-textInput') as HTMLInputElement;
        fireEvent.change(datePicker, {target: {value: "xx.99.2020"}});
        waitFor(() => {
            expect(datePicker.value).toBe('xx.99.2020')
        })

        expect(dom.getByText("Invalid date format")).toBeInTheDocument();
    });

    test("Doesn't show an error on valid input", async () => {
        const dom = render(
            <Formik onSubmit={() => {
            }}
                    validateOnChange={true}
                    validationSchema={yup.object().shape({
                        dateOfBirth: yup.date().typeError("Invalid date!"),
                    })}
                    initialValues={{}}><CustomDatePicker label={"test-label"}
                                                                  name={"dateOfBirth"}/></Formik>,
            {initialState: {}});
        const datePicker = document.getElementById('dateOfBirth-date-textInput') as HTMLInputElement;
        fireEvent.change(datePicker, {target: {value: "10.10.2020"}});
        waitFor(() => {
            expect(datePicker.value).toBe('10.10.2020')
        })

        expect(dom.queryByText("Invalid date format")).not.toBeInTheDocument();

    });
});