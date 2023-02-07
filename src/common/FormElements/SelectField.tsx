import React from 'react';

import { useField } from 'formik';
import { FormHelperText, InputLabel, MenuItem } from '@mui/material';
import { DropdownOption } from './ValidatedDropdown';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  label?: string;
  name: string;
  value: string;
  menuItems: DropdownOption[];
  maxChar?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  inputClassName?: string;
  customRenderFunction?: (menuItem: DropdownOption) => React.ReactNode;
  customOnChange?: (event: SelectChangeEvent) => void;
  customDataTestId?: string;
};

const SelectField = ({
  label,
  menuItems,
  value,
  customRenderFunction,
  placeholder,
  disabled = false,
  required = false,
  inputClassName,
  customOnChange,
  customDataTestId,
  ...rest
}: Props) => {
  const [field, meta] = useField(rest);
  const { error, touched } = meta;

  const isError = error && touched;
  const errorMessage = isError && error;

  return (
    <>
      <InputLabel
        id={`${field.name}Label`}
        required={required}
        disabled={disabled}
        htmlFor={field.name}
      >
        {label}
      </InputLabel>
      <Select
        id={`${field.name}-select`}
        {...field}
        value={value}
        displayEmpty
        fullWidth={true}
        variant="standard"
        onChange={(event: SelectChangeEvent) => {
          console.log(event, field);
          customOnChange ? customOnChange(event) : field.onChange(event);
        }}
        disabled={disabled}
        inputProps={{
          'data-testid': customDataTestId ?? field.name,
          placeholder: placeholder,
          className: inputClassName,
        }}
      >
        {menuItems.map((menuItem: DropdownOption, index) => (
          <MenuItem id={menuItem.label} key={index} value={menuItem.value}>
            {customRenderFunction ? customRenderFunction(menuItem) : menuItem.label}
          </MenuItem>
        ))}
      </Select>
      {isError && (
        <FormHelperText id={`${field.name}-helper-text`} className={'Mui-error'}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};

export default SelectField;
