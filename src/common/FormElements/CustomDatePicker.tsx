import React from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { FormControlLabel, TextField, InputLabel } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { fieldStyles } from './ValidatedDropdown';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import moment, { Moment } from 'moment';

type DatePickerFormFields = {
  [key: string]: string;
};

export const errorMessages = {
  shouldDisableDate: 'Date is disabled',
  invalidDate: 'Invalid date format',
  invalidRange: 'Invalid range',
  disablePast: 'Values in the past are not allowed',
  disableFuture: 'Values in the future are not allowed',
  maxDate: 'Date should not be after the maximum date!',
  minDate: 'Date should not be before the minimum date',
};

/**
 * Date picker component based on the MUI DesktopDatePicker.
 * Only usable in a Formik context.
 * @param name The name of the field used in Formik.
 * @param label The label text displayed on top of the date picker.
 * @param minDate (Optional) The amount of days backdating is allowed, from the current day.
 * @param disabled (Optional) Determines if input is allowed.
 * @param disableFuture (Optional) Determines if future dates can be picked.
 * @param dateTime (Optional) Allows setting a date-time value, with time defaulting to current time.
 * @param validateError (Optional) Enables or disables error validation.
 * @constructor
 */
const CustomDatePicker = ({
  name,
  label,
  disableFuture = false,
  dateTime = false,
  validateError = true,
  disabled = false,
}: {
  name: string;
  label: string;
  disableFuture?: boolean;
  dateTime?: boolean;
  validateError?: boolean;
  disabled?: boolean;
}) => {
  const classes = fieldStyles();
  const { errors, setErrors } = useFormikContext<DatePickerFormFields>();

  const handleError = (reason: string) => {
    setErrors({
      ...errors,
      [name]: (reason && (errorMessages as any)[reason]) || undefined,
    });
  };

  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => {
        return (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={{ normalDate: 'DD.MM.YYYY', keyboardDate: 'DD.MM.YYYY' }}
          >
            <InputLabel id={`${field.name}Label`} disabled={disabled} htmlFor={field.name}>
              {label}
            </InputLabel>

            <DesktopDatePicker
              style={{ width: '100%' }}
              mask="__.__.____"
              renderInput={(props: any) => {
                return (
                  <TextField
                    {...props}
                    error={!!errors[name]}
                    helperText={errors[name]}
                    id={`${name}-date-textInput`}
                    className={classes.textInput}
                    variant="standard"
                    onChange={() => form.setFieldTouched(field.name, true, true)}
                    margin="dense"
                  />
                );
              }}
              {...field}
              margin="dense"
              variant="standard"
              disabled={disabled}
              className={classes.textInput}
              InputProps={{ disableUnderline: true }}
              inputProps={{ placeholder: '' }}
              onError={handleError}
              onChange={(date: Moment | null) => {
                form.setFieldTouched(field.name, true, true);
                form.setFieldValue(
                  field.name,
                  date !== null
                    ? date.isValid()
                      ? dateTime
                        ? moment(date).toISOString()
                        : moment(date!).format('yyyy-MM-DD')
                      : date.toDate()
                    : null
                );
              }}
              id={`${name}-datePicker`}
              inputVariant="standard"
              disableFuture={disableFuture}
            />
          </LocalizationProvider>
        );
      }}
    </Field>
  );
};

export default CustomDatePicker;
