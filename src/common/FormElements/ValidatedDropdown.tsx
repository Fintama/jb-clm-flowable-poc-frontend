//@ts-nocheck
import React from 'react';
import { useFormikContext } from 'formik';
import { Chip, FormControlLabel, TextField, Theme } from '@mui/material';

import { Autocomplete, AutocompleteRenderInputParams } from '@mui/lab';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const fieldStyles = makeStyles()((theme: Theme) => ({
  errorText: {
    color: '#E53935',
    fontSize: '11px',
    marginLeft: '10px',
  },
  labelRoot: {
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  labelPlacementTop: {
    alignItems: 'flex-start',
  },
  textInput: {
    marginTop: theme.spacing(0.5),
    width: '100%',
    border: 0,
  },
  autocomplete: {
    marginTop: theme.spacing(0.25),
    width: '100%',
    border: 0,
  },
}));

export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * A dropdown field component based on the MUI Autocomplete.
 * @param props.label The displayed label (helper text) of the field.
 * @param props.name The name to be used as the field name in the Formik form.
 * @param props.options The possible options for the dropdown.
 * @param props.isMultiChoice Set whether multiple choices are allowed.
 * @param props.isDisabled Set whether the field is disabled.
 */
const ValidatedDropdown = (props: {
  label: string;
  name: string;
  options: DropdownOption[];
  id?: string;
  isMultiChoice?: boolean;
  isDisabled?: boolean;
  loading?: boolean;
  action?: (result) => void;
  textFieldLabel?: string;
}) => {
  const name = props.name;
  const { classes: fieldClasses } = fieldStyles();
  const formikContext = useFormikContext();
  const itemValue = formikContext.values[`${props.name}`];

  return (
    <Autocomplete
      key={props.name}
      options={props.options ? props.options : []}
      data-testid={props.id ? `${props.id}-autocomplete` : `${name}-autocomplete`}
      id={`${name}-autocomplete`}
      disabled={props.isDisabled}
      disableCloseOnSelect={props.isMultiChoice}
      loading={props.loading}
      size="small"
      getOptionLabel={(option) => {
        return option.label;
      }}
      value={
        props.loading || !props.options || itemValue === ''
          ? null
          : props.isMultiChoice
          ? props.options.filter((option) => itemValue && itemValue.includes(option.value))
          : props.options.find((option) => option.value === itemValue)
      }
      onChange={(_, value) => {
        if (props.action) {
          props.action(value);
        } else {
          formikContext.setFieldValue(
            props.name,
            props.isMultiChoice ? value.map((v) => v.value) : value ? value.value : ''
          );
          formikContext.setFieldTouched(props.name, true, false);
        }
      }}
      multiple={props.isMultiChoice}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.label}
            id={`${name}-chip-${index}`}
            size="small"
            style={{ padding: 0, margin: 0 }}
            {...getTagProps({ index })}
            key={option.label}
          />
        ))
      }
      renderInput={(params: AutocompleteRenderInputParams) => {
        return (
          <FormControlLabel
            label={props.label}
            id={`${name}-input-label`}
            labelPlacement="top"
            className={fieldClasses.autocomplete}
            classes={{
              root: fieldClasses.labelRoot,
              labelPlacementTop: fieldClasses.labelPlacementTop,
            }}
            control={
              <TextField
                {...params}
                label={props.textFieldLabel}
                className={fieldClasses.autocomplete}
                error={
                  // eslint-disable-next-line no-use-before-define
                  formikContext.touched.hasOwnProperty(props.name) &&
                  formikContext.errors.hasOwnProperty(props.name)
                }
                helperText={
                  formikContext.touched.hasOwnProperty(props.name) &&
                  formikContext.errors[`${props.name}`]
                }
                fullWidth={true}
                inputProps={{
                  ...params.inputProps,
                  'data-testid': `${name}-content-input`,
                  id: `${name}-content-input`,
                }}
                variant="standard"
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            }
          />
        );
      }}
    />
  );
};

export default ValidatedDropdown;
