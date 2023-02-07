import React from 'react';

import { FormControl, TextField } from '@mui/material';

import { ColumnDefinition, DataTableWithId } from '../DataTable/DataTableTypes';
import { jbColors } from '../../app/theme/jbColors';
import { makeStyles } from 'tss-react/mui';
import { theme } from "../../app/theme";

const useStyles = makeStyles()(() => ({
  textInput: {
    backgroundColor: jbColors.support.greenSmoke[10],
  },
}));

type Props<T> = {
  headCell: ColumnDefinition<T>;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent) => void;
};

export const SearchFilter = <T extends DataTableWithId>({
  headCell,
  inputValue,
  handleInputChange,
}: Props<T>) => {
  const { classes } = useStyles();
  return (
    <FormControl fullWidth style={{ marginBottom: theme.spacing(1) }}>
      <TextField
        placeholder={
          headCell.filterInputPlaceholder ? headCell.filterInputPlaceholder : 'Search a value...'
        }
        variant="standard"
        value={inputValue}
        onChange={(event) => handleInputChange(event)}
        InputProps={{ disableUnderline: true, inputProps: { min: 0 } }}
        className={classes.textInput}
        type={headCell.filterInputType ? headCell.filterInputType : 'text'}
      />
    </FormControl>
  );
};
