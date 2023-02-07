import React, { useState, ChangeEvent, useEffect } from 'react';

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
  IconButton,
  Menu,
  Typography,
  Tooltip,
  Theme,
} from '@mui/material';

import { ColumnDefinition, DataTableWithId, HeadCellFilterType } from '../DataTable/DataTableTypes';
import { jbColors } from '../../app/theme/jbColors';
import TableFilterIcon from 'assets/icons/table-filter.svg';
import SortFilterIcon from 'assets/icons/sort-filter.svg';
import { SearchFilter } from './SearchFilter';
import InfoIcon from 'assets/icons/info-icon.svg';
import FilterHoverIcon from 'assets/icons/filterHover-icon.svg';
import SortAscendingIcon from 'assets/icons/sortActiveAscending-icon.svg';
import SortDescendingIcon from 'assets/icons/sortActiveDescending-icon.svg';
import FilterActiveIcon from 'assets/icons/filterActive-icon.svg';
import SortHoverAscendingIcon from 'assets/icons/sortHoverAscending-icon.svg';
import SortHoverDescendingIcon from 'assets/icons/sortHoverDescending-icon.svg';
import { DateFilter, rangeShortcuts } from './DateFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { createCheckboxFilterValues } from '../DataTable/DataTableUtils';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const filterStyles = makeStyles()((theme: Theme) => ({
  filterContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    padding: 0,
  },
  paper: {
    borderRadius: 0,
    border: `1px solid ${jbColors.app.lightGrey}`,
    minWidth: 225,
    maxWidth: 350,
    padding: theme.spacing(1, 2),
  },
  label: {
    width: '100%',
  },
  menuItem: {
    padding: 0,
    whiteSpace: 'normal',
  },
  sortIcon: {
    marginRight: 4,
  },
}));

type Props<T> = {
  headCell: ColumnDefinition<T>;
  rows: T[];
  handleResetFilterClick: (filterId: keyof T) => void;
  handleAscSort: (isAscToggled: boolean, property: keyof T) => void;
  handleDescSort: (isAscToggled: boolean, property: keyof T) => void;
  handleAllChangeClick: (
    checked: boolean,
    selectedFilters: { [key: string]: string }[],
    filterId: keyof T,
    searchFilterValue: string
  ) => void;
  handleCheckboxFilterClick: (
    selectedFilters: { [key: string]: string },
    filterId: keyof T,
    checked: boolean,
    searchFilterValue: string,
    isDateFilter?: boolean
  ) => void;
  handleSearchFilter: (inputValue: string, filterId: keyof T) => void;
};

export const DataTableFilter = <T extends DataTableWithId>({
  headCell,
  rows,
  handleResetFilterClick,
  handleAscSort,
  handleDescSort,
  handleAllChangeClick,
  handleCheckboxFilterClick,
  handleSearchFilter,
}: Props<T>) => {
  const { classes } = filterStyles();
  const { label, id, filter } = headCell;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isHoverToggled, setIsHoverToggled] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isAscSortingToggled, setIsAscSortingToggled] = useState(false);
  const [isSortAscHoverToggled, setIsSortAscHoverToggled] = useState(false);
  const [isDescSortingToggled, setIsDescSortingToggled] = useState(false);
  const [isSortDescHoverToggled, setIsSortDescHoverToggled] = useState(false);
  const [filterValues, setFiltervalues] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const isDateFilter = filter === HeadCellFilterType.DATEFILTER;

  useEffect(() => {
    const checkboxFilterValues = createCheckboxFilterValues(rows, id);
    const filterCheckboxFilterValues = checkboxFilterValues.filter((filterValue) =>
      String(filterValue).toLowerCase().includes(inputValue.toLocaleLowerCase())
    );

    const filterSelectedCheckboxFilters = selectedFilters.filter((selectedFilterValue) =>
      String(selectedFilterValue).toLowerCase().includes(inputValue.toLocaleLowerCase())
    );

    setFiltervalues(filterCheckboxFilterValues as string[]);
    setSelectedFilters(filterSelectedCheckboxFilters);
  }, [inputValue]);

  useEffect(() => {
    const isFilterActive = selectedFilters.some((filter) =>
      Object.keys(filter).find((key) => key === id)
    );

    if (!isFilterActive) {
      const filterValues = createCheckboxFilterValues(rows, id);
      setFiltervalues(filterValues as string[]);
    }
  }, [anchorEl]);

  const handleAscToggle = (isToggled: boolean) => {
    setIsAscSortingToggled(!isToggled);
    setIsDescSortingToggled(false);
    handleAscSort(!isToggled, id);
    setIsFilterActive(!isToggled);
    setAnchorEl(null);
  };

  const handleDescToggle = (isToggled: boolean) => {
    setIsDescSortingToggled(!isToggled);
    setIsAscSortingToggled(false);
    handleDescSort(!isToggled, id);
    setIsFilterActive(!isToggled);
    setAnchorEl(null);
  };

  const handleAllChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    // TODO - refactor this if statement
    if (checked || !!selectedFilters.length) {
      setSelectedFilters([]);
      setIsAllSelected(true);
      handleAllChangeClick(checked || !!selectedFilters.length, [], id, inputValue);
      setIsFilterActive(!!inputValue);
    } else {
      let filteredValues: { [key: string]: string }[] = [];
      if (isDateFilter) {
        filteredValues = rangeShortcuts.map((datefilter: any) => {
          return { [id]: datefilter.value };
        });
      } else {
        filteredValues = filterValues.map((filterValue) => {
          return { [id]: filterValue };
        });
      }

      setSelectedFilters(filteredValues);
      setIsAllSelected(false);
      handleAllChangeClick(checked, filteredValues, id, inputValue);
    }
  };

  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    const inputValue = event.target.value as string;
    setInputValue(inputValue);
    setIsFilterActive(!!selectedFilters.length || !!inputValue);
    setIsAllSelected(true);
    handleSearchFilter(inputValue, id);
  };

  const handleDateInputChange = (values: any) => {
    const filterEmptyValue = values.filter((value: null) => !!value);

    !!filterEmptyValue.length && handleFilterChange(id, values, false, true);
  };

  const handleFilterChange = (
    filterId: keyof T,
    value: string,
    checked: boolean,
    isDateFilter?: boolean
  ) => {
    const selectedFilterObject = { [filterId]: value };
    let filteredValues = selectedFilters;
    if (!checked) {
      if (isDateFilter) {
        filteredValues = [selectedFilterObject];
      } else {
        if (selectedFilters.length) {
          filteredValues = [...selectedFilters, { [filterId]: value }];
        } else {
          filteredValues = [selectedFilterObject];
        }
      }
    } else {
      filteredValues = filteredValues.filter(
        (selectedFilter) => selectedFilter[filterId as string] !== value
      );
    }

    setIsFilterActive(!!filteredValues.length || !!inputValue);
    setSelectedFilters(filteredValues);
    setIsAllSelected(filteredValues.length !== filterValues.length);
    handleCheckboxFilterClick(selectedFilterObject, id, checked, inputValue, isDateFilter);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const filteredValue = event.target.value;
    const filterId = id;
    handleFilterChange(filterId, filteredValue, checked);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggledColor = (isToggled: boolean) =>
    isToggled ? jbColors.core.reflexBlue[100] : jbColors.support.greenSmoke[60];

  const isFilterToggled =
    isHoverToggled || isAscSortingToggled || isDescSortingToggled || isFilterActive;

  const showFilterIcon = () => {
    if (isHoverToggled) {
      return <FilterHoverIcon />;
    } else if (isAscSortingToggled) {
      return <SortAscendingIcon />;
    } else if (isDescSortingToggled) {
      return <SortDescendingIcon />;
    } else if (isFilterActive) {
      return <FilterActiveIcon />;
    } else {
      return <TableFilterIcon />;
    }
  };

  const showSortIcon = (isToggled: boolean, iconName: 'desc' | 'asc') => {
    if (isToggled && iconName === 'asc') {
      return <SortHoverAscendingIcon className={classes.sortIcon} />;
    } else if (isToggled && iconName === 'desc') {
      return <SortHoverDescendingIcon className={classes.sortIcon} />;
    } else {
      return (
        <SortFilterIcon
          style={{ fill: jbColors.support.greenSmoke[60] }}
          className={classes.sortIcon}
        />
      );
    }
  };

  const handleReset = () => {
    handleResetFilterClick(id);
    setIsFilterActive(false);
    setIsAscSortingToggled(false);
    setIsDescSortingToggled(false);
  };

  return (
    <>
      <Box
        className={classes.filterContainer}
        onClick={handleClick}
        onMouseEnter={() => setIsHoverToggled(true)}
        onMouseLeave={() => setIsHoverToggled(false)}
      >
        <Box display="flex" color={toggledColor(isFilterActive)} mr={1}>
          <Typography variant="caption" style={{ color: toggledColor(isFilterToggled) }}>
            {label}{' '}
          </Typography>
          {headCell.headerTooltipText ? (
            <Tooltip title={headCell.headerTooltipText} arrow>
              <Box ml={1} mt={'2px'}>
                <InfoIcon></InfoIcon>
              </Box>
            </Tooltip>
          ) : null}
        </Box>
        <IconButton
          aria-haspopup="true"
          id={`${label}-icon`}
          disableRipple
          disableFocusRipple
          className={classes.iconButton}
          style={{ fill: toggledColor(isFilterActive) }}
        >
          {showFilterIcon()}
        </IconButton>
      </Box>
      <Menu
        classes={{ paper: classes.paper }}
        disableEnforceFocus
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={() => handleAscToggle(isAscSortingToggled)}
            onMouseEnter={() => setIsSortAscHoverToggled(true)}
            onMouseLeave={() => setIsSortAscHoverToggled(false)}
            sx={{ paddingLeft: 0 }}
          >
            {showSortIcon((isAscSortingToggled || isSortAscHoverToggled) && !!anchorEl, 'asc')}
            <Typography
              variant="caption"
              style={{
                color: toggledColor(isAscSortingToggled || isSortAscHoverToggled),
              }}
            >
              {isDateFilter ? 'Old-new' : 'A-Z/1-9'}
            </Typography>
          </Button>

          <Button
            onClick={() => handleDescToggle(isDescSortingToggled)}
            onMouseEnter={() => setIsSortDescHoverToggled(true)}
            onMouseLeave={() => setIsSortDescHoverToggled(false)}
            sx={{ paddingRight: 0 }}
          >
            {showSortIcon((isDescSortingToggled || isSortDescHoverToggled) && !!anchorEl, 'desc')}
            <Typography
              variant="caption"
              style={{
                color: toggledColor(isDescSortingToggled || isSortDescHoverToggled),
              }}
            >
              {isDateFilter ? 'New-old' : 'Z-A/9-1'}
            </Typography>
          </Button>
        </Box>

        <Box mb={2} mt={1}>
          <Divider />
        </Box>

        <FormGroup>
          {filter === HeadCellFilterType.SEARCHFILTER && (
            <FormControl fullWidth>
              <SearchFilter
                headCell={headCell}
                inputValue={inputValue}
                handleInputChange={(event: any) => handleInputChange(event)}
              />
            </FormControl>
          )}

          {filter === HeadCellFilterType.CHECKBOXFILTER && (
            <CheckboxFilter
              headCell={headCell}
              handleAllChange={handleAllChange}
              handleChange={handleChange}
              filterValues={filterValues}
              isAllSelected={isAllSelected}
              selectedFilters={selectedFilters}
            />
          )}
          {filter === HeadCellFilterType.CHECKBOXANDSEARCHFILTER && (
            <>
              <SearchFilter
                headCell={headCell}
                inputValue={inputValue}
                handleInputChange={(event: any) => handleInputChange(event)}
              />

              <CheckboxFilter
                headCell={headCell}
                handleAllChange={handleAllChange}
                handleChange={handleChange}
                filterValues={filterValues}
                isAllSelected={isAllSelected}
                selectedFilters={selectedFilters}
              />
            </>
          )}

          {filter === HeadCellFilterType.DATEFILTER && (
            <DateFilter
              handleDateInputChange={handleDateInputChange}
              selectedFilters={selectedFilters}
            ></DateFilter>
          )}
        </FormGroup>
        <Box mt={3}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              setSelectedFilters([]);
              setInputValue('');
              handleReset();
            }}
            disabled={!isFilterActive}
          >
            Clear filter
          </Button>
        </Box>
      </Menu>
    </>
  );
};
