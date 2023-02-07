import React, { useEffect, useState } from 'react';
import { Radio, FormControl, FormControlLabel, MenuItem, TextField, Box } from '@mui/material';
import { filterStyles } from './DataTableFilters';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, LocalizationProvider, DateRange } from '@mui/x-date-pickers-pro';
import moment, { Moment } from 'moment';

const RangeShortcut = {
  reset: 'RESET',
  lastMonth: 'LAST_MONTH',
  last6Months: 'LAST_6_MONTHS',
  lastYear: 'LAST_YEAR',
  last2Years: 'LAST_2_YEARS',
  last5Years: 'LAST_5_YEARS',
};

type RangeShortcutType = keyof typeof RangeShortcut;

export const rangeShortcuts = [
  {
    range: RangeShortcut.lastMonth,
    label: 'Since 30 days',
  },
  {
    range: RangeShortcut.last6Months,
    label: 'Last 6 months',
  },
  {
    range: RangeShortcut.lastYear,
    label: 'Last 12 months',
  },
  {
    range: RangeShortcut.last2Years,
    label: 'Last 2 years',
  },
  {
    range: RangeShortcut.last5Years,
    label: 'Last 5 years',
  },
];

type Props = {
  handleDateInputChange: (values: DateRange<Moment>) => void;
  selectedFilters: { [key: string]: string | Moment[] | null[] }[];
};

export const DateFilter = ({ handleDateInputChange, selectedFilters }: Props) => {
  const classes = filterStyles();

  const [value, setValue] = React.useState<DateRange<Moment>>([null, null]);
  const [checkboxSelected, setCheckboxSelected] = useState<{ [key: string]: string }>({
    lastAction: '',
  });

  useEffect(() => {
    handleDateInputChange(value);
  }, [value]);

  useEffect(() => {
    const dateFilters = selectedFilters.some((selectedFilter) => selectedFilter['lastAction']);
    if (!dateFilters) {
      setValue([null, null]);
      setCheckboxSelected({ lastAction: '' });
    }
  }, [selectedFilters]);

  const buildHandleRangeClick =
    (setValue: React.Dispatch<React.SetStateAction<DateRange<Moment>>>) =>
    (range: RangeShortcutType) => {
      switch (range) {
        case RangeShortcut.lastMonth:
          setValue([moment().subtract(1, 'month'), moment()]);
          break;
        case RangeShortcut.last6Months:
          setValue([moment().subtract(6, 'month'), moment()]);
          break;
        case RangeShortcut.lastYear:
          setValue([moment().subtract(1, 'year'), moment()]);
          break;
        case RangeShortcut.last2Years:
          setValue([moment().subtract(2, 'year'), moment()]);
          break;
        case RangeShortcut.last5Years:
          setValue([moment().subtract(5, 'year'), moment()]);
          break;
        default:
          break;
      }
    };

  const handleRangeClick = React.useCallback(
    (range: RangeShortcutType) => {
      setValue && buildHandleRangeClick(setValue)(range);
      setCheckboxSelected({ lastAction: range });
    },
    [setValue]
  );

  return (
    <FormControl fullWidth>
      <Box mb={1}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateFormats={{ normalDate: 'DD.MM.YYYY', keyboardDate: 'DD.MM.YYYY' }}
        >
          <DateRangePicker
            startText=""
            endText=""
            mask="__.__.____"
            value={value}
            disableFuture
            onChange={(newValue) => setValue(newValue)}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} variant="standard" helperText={''} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} variant="standard" helperText={''} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </Box>

      {rangeShortcuts.map(({ range, label }, index: number) => (
        <React.Fragment key={index}>
          <MenuItem
            key={range}
            id="filter-menu-item"
            data-testid="filter-menu-item"
            className={classes.menuItem}
            sx={{ paddingX: 1 }}
          >
            <FormControlLabel
              key={`filter-checkbox-${label}`}
              className={classes.label}
              control={
                <Radio
                  id={`filter-checkbox-${label}`}
                  checked={checkboxSelected['lastAction'] === range}
                  sx={{ padding: 0.5 }}
                  onChange={() => handleRangeClick(range as RangeShortcutType)}
                  value={range}
                  color="primary"
                  size="small"
                  name={'dateCheckbox'}
                />
              }
              label={label}
            />
          </MenuItem>
        </React.Fragment>
      ))}
    </FormControl>
  );
};
