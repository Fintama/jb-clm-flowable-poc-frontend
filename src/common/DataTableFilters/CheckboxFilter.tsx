import React, { useTransition } from 'react';

import { Checkbox, FormControlLabel, MenuItem, Divider, Typography, Box } from '@mui/material';

import { ColumnDefinition, DataTableWithId } from '../DataTable/DataTableTypes';
import { filterStyles } from './DataTableFilters';
import { formatEnum } from 'common/utils/stringUtils';
import { useTranslation } from 'react-i18next';

type Props<T> = {
  headCell: ColumnDefinition<T>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  selectedFilters: { [key: string]: string }[];
  isAllSelected: boolean;
  handleAllChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  filterValues: string[];
};

export const CheckboxFilter = <T extends DataTableWithId>({
  headCell,
  filterValues,
  selectedFilters,
  handleChange,
  isAllSelected,
  handleAllChange,
}: Props<T>) => {
  const classes = filterStyles();
  const { t } = useTranslation();
  const { filterIsEnum, id, translationKey } = headCell;

  const renderCheckboxes = (
    <>
      <MenuItem id="filter-menu-item" data-testid="filter-menu-item" sx={{ paddingX: 1 }}>
        <FormControlLabel
          key={`filter-checkbox-all`}
          className={classes.label}
          control={
            <Checkbox
              id={'filter-checkbox-all'}
              sx={{ padding: 0.5 }}
              checked={isAllSelected}
              onChange={handleAllChange}
              indeterminate={!!selectedFilters.length && isAllSelected}
              color="primary"
              size="small"
              value={'All'}
              name="All"
            />
          }
          label="All"
        />
      </MenuItem>
      <Divider />

      {filterValues &&
        filterValues.map((filteredValue, i) => (
          <MenuItem
            key={`filter-checkbox-item-${i}`}
            id={`filter-checkbox-item-${filteredValue}`}
            data-testid={`filter-item-${filteredValue}`}
            sx={{ paddingX: 1 }}
          >
            <FormControlLabel
              key={`filter-item-label-${i}`}
              className={classes.label}
              control={
                <Checkbox
                  id={`checkbox-${filteredValue}`}
                  checked={
                    !selectedFilters.length ||
                    !selectedFilters.find(
                      (selectedFilter) => selectedFilter[id as string] === filteredValue
                    )
                  }
                  size="small"
                  sx={{ padding: 0.5 }}
                  onChange={handleChange}
                  value={filteredValue}
                  color="primary"
                  name={filteredValue}
                  // @ts-ignore
                  inputProps={{ 'data-testid': `checkbox-${filteredValue}` }}
                />
              }
              label={
                filterIsEnum
                  ? formatEnum(filteredValue)
                  : translationKey
                  ? t(`${translationKey}${filteredValue}`)
                  : filteredValue
              }
            />
          </MenuItem>
        ))}
    </>
  );

  const renderNoData = (
    <Box mt={2} display="flex" justifyContent="center">
      <Typography>No matches</Typography>
    </Box>
  );

  return filterValues.length ? renderCheckboxes : renderNoData;
};
