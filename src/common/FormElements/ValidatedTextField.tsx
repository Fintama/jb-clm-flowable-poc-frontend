import React from 'react';
import { Field, useField } from 'formik';
import { TextField, Theme, InputLabel } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useTextfieldStyles = makeStyles()((theme: Theme) => ({
  labelRoot: {
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    width: '100%',
  },
  helperText: {
    fontWeight: 'normal',
    textAlign: 'right',
  },
  labelPlacementTop: {
    alignItems: 'flex-start',
  },
  textInput: {
    marginTop: theme.spacing(0.5),
    width: '100%',
  },
}));

interface TextFieldProps {
  label: string;
  name: string;
  maxChar: number;
  readOnly?: boolean;
  disabled?: boolean;
  customValue?: string;
  placeholder?: string;
  showCharacterCount?: boolean;
  rowCount?: number;
}

/**
 * A text field component based on the MUI TextField.
 * Only usable within a Formik context.
 * @param props.label The label text displayed above the component.
 * @param props.name The name used in the Formik context.
 * @param props.maxChar The maximum character count of the
 * @constructor
 */
const ValidatedTextField: React.FC<TextFieldProps> = (props) => {
  const { label } = props;
  const { classes } = useTextfieldStyles();
  const [field, meta] = useField<any>(props);
  if (props.customValue) {
    field.value = props.customValue;
  }
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <>
      <InputLabel id={`${props.name}-text-label`} disabled={props.disabled}>
        {label}
      </InputLabel>

      <Field
        variant="standard"
        margin="dense"
        className={classes.textInput}
        rows={props.rowCount}
        multiline={props.rowCount !== 1}
        id={`${props.name}-text-input`}
        data-testid={`${props.name}-text-input`}
        as={TextField}
        helperText={
          errorText ||
          (props.showCharacterCount &&
            (!field.value
              ? '0/' + props.maxChar
              : field.value.toLocaleString().length + '/' + props.maxChar))
        }
        errortext={errorText}
        FormHelperTextProps={{
          className: props.showCharacterCount && !errorText ? classes.helperText : '',
        }}
        inputProps={{
          maxLength: props.maxChar,
          placeholder: props.placeholder,
          readOnly: props.readOnly,
          disabled: props.disabled,
        }}
        InputProps={{ disableUnderline: true }}
        {...field}
        fullWidth
        error={!!errorText}
      />
    </>
  );
};

ValidatedTextField.defaultProps = {
  showCharacterCount: false,
  rowCount: 1,
} as Partial<TextFieldProps>;

export default ValidatedTextField;
